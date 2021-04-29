import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
// import Menu from '@material-ui/core/Menu'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { parseCookies, setCookie } from 'nookies'
import { stringify } from 'querystring'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import jwt from 'jsonwebtoken'
import styles from './bnetprofilelist.module.css'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      border: '2px solid black',
      borderRadius: '1rem',
      backgroundColor: '#202020',
      position: 'relative',
      overflowY: 'scroll',
      height: 330,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: '2px',
    },
  })
)

const CHARACTERLEVELFILTER = 50
const NINETY_DAYS = +1000 * 60 * 60 * 24 * 90

async function GetCharacterAvatar(name, realm) {
  const { region } = parseCookies()
  const accessToken = JSON.parse((jwt.decode(JSON.parse(parseCookies().id)) as { [key: string]: string }).sessionToken)
    .access_token
  const redirectUri = `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${name.toLowerCase()}/character-media?${stringify(
    {
      namespace: `profile-${region}`,
      locale: 'en_GB',
      access_token: accessToken,
    }
  )}`
  const res = await fetch(redirectUri)
  const json = await res.json()

  return json.avatar_url || json.assets?.filter((a) => a.key === 'avatar')[0]?.value || ''
}

async function GetCharacterGuild(name, realm) {
  const { region } = parseCookies()
  const accessToken = JSON.parse((jwt.decode(JSON.parse(parseCookies().id)) as { [key: string]: string }).sessionToken)
    .access_token
  const redirectUri = `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${name.toLowerCase()}?${stringify(
    {
      namespace: `profile-${region}`,
      locale: 'en_GB',
      access_token: accessToken,
    }
  )}`
  const res = await fetch(redirectUri)
  const json = await res.json()

  return json.guild?.name || ''
}

async function PopulateData(accountData) {
  const characterList = []

  const rawCharacters = accountData.wow_accounts.flatMap((e) => e.characters)
  await Promise.all(
    rawCharacters.map(async (i) => {
      if (i.level >= CHARACTERLEVELFILTER) {
        const avatarlink = await GetCharacterAvatar(i.name, i.realm.slug)
        const characterInfo = await GetCharacterGuild(i.name, i.realm.slug)

        const newCharacter = {
          id: i.id,
          charactername: i.name,
          level: i.level,
          faction: i.faction.name,
          realm: i.realm.name,
          guild: characterInfo,
          avatar: avatarlink,
        }

        characterList.push(newCharacter)
      }
    })
  )

  // Sort Level 60s First.
  // Characters of the Same Level will be Sorted Alphabetically

  characterList.sort((a, b) => {
    return b.level - a.level
  })

  characterList.sort((a, b) => {
    let test = 0
    if (a.level === b.level) {
      test = a.charactername.localeCompare(b.charactername)
    }
    return test
  })

  return characterList
}

function ProfileList({ profile }: { profile: any[] }) {
  const classes = useStyles()
  const handleMenuItemClick = (event, index) => {
    const option = profile[index]
    const character = { name: option.charactername, guild: option.guild, avatarUrl: option.avatar }
    setCookie(null, 'character', JSON.stringify(character), {
      expires: new Date(Date.now() + NINETY_DAYS),
      sameSite: 'Lax',
      path: '/',
    })
  }
  return (
    <div className={styles.characterSelection}>
      <div className={styles.selectCharacter}>Select a Character</div>
      <MenuList className={classes.root} subheader={<li />} style={{ padding: '5px' }}>
        {profile.map((option, index) => (
          <MenuItem
            component="a"
            href="/"
            style={{
              border: '2px solid #856c11',

              background:
                option.faction === 'Horde'
                  ? 'url(/images/guildy/characterselect_horde.png)'
                  : 'url(/images/guildy/characterselect_alliance.png)',
              borderRadius: '1rem',

              maxWidth: 351,
              height: '80px',
              margin: '5px 0',
            }}
            key={index}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            <div className={styles.characterFrame}>
              <div className={styles.characterPortrait} style={{ background: `url(${option.avatar})` }} />
              <div className={styles.names}>
                <div className={styles.characterNames}>
                  <div>{option.charactername}</div>
                  <div style={{ fontSize: '0.7rem' }}>{option.guild}</div>
                </div>
                <div className={styles.characterRealm}>
                  <div>
                    Level {option.level} {option.class}
                  </div>
                  <div>{option.realm}</div>
                </div>
              </div>
            </div>
          </MenuItem>
        ))}
      </MenuList>
    </div>
  )
}

function jsonFetch(url: string) {
  return fetch(url).then((res) => res.json())
}

const BnetProfileList = () => {
  const [characterList, setCharacterList] = useState([])
  const { region } = parseCookies()
  const accessToken = JSON.parse((jwt.decode(JSON.parse(parseCookies().id)) as { [key: string]: string }).sessionToken)
    .access_token

  const redirectUri = `https://${region}.api.blizzard.com/profile/user/wow?${stringify({
    namespace: `profile-${region}`,
    locale: 'en_GB',
    access_token: accessToken,
  })}`

  const { data, error } = useSWR(redirectUri, jsonFetch)

  useEffect(() => {
    ;(async () => {
      if (data) {
        if (data.code === 404) {
          return
        }
        setCharacterList(await PopulateData(data))
      }
    })()
  }, [data])

  if (error) {
    return (
      <div className={styles.characterSelection}>
        <div style={{ color: 'white' }}>There was an Error...</div>)
      </div>
    )
  }
  if (!data)
    return (
      <div className={styles.characterSelection}>
        <div style={{ color: 'white' }}>Loading...</div>)
      </div>
    )
  return (
    <div>
      <div />
      <ProfileList profile={characterList} />
    </div>
  )
}

export default BnetProfileList
