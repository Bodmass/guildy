import { useState, useEffect } from 'react'
import { parseCookies } from 'nookies'
import styles from './header.module.css'
import SettingsWindow from './Settings'
import Notifications from './HeaderDropdown/Notifications'
import SettingsPopover from './HeaderDropdown/SettingsDropdown'

function AvatarRender({ avatarURL }: { avatarURL: string }) {
  useEffect(() => {
    document.getElementById('avatarImg').setAttribute('src', avatarURL)
  }, [])
  return (
    <>
      <img id="avatarImg" alt="" className={styles.profileimage} src={avatarURL} />
    </>
  )
}

const Header = () => {
  const [characterStatus, setCharacterStatus] = useState(null)

  const [settingsWindowStatus, setSettingsWindow] = useState(false)

  const cookies = parseCookies().character
  const characterParsed = JSON.parse(cookies || '{}')
  const characterName = characterParsed.name
  const characterGuild = characterParsed.guild
  const characterAvatar = characterParsed.avatarUrl

  useEffect(() => {
    if (cookies === '{}') {
      // notloggedin
    } else {
      setCharacterStatus(cookies)
    }
  }, [])

  // eslint-disable-next-line no-console
  // console.log(characterGuild)

  if (characterStatus !== undefined) {
    return (
      <div>
        <SettingsWindow windowStatus={settingsWindowStatus} setWindow={setSettingsWindow} />
        <div className={styles.header}>
          <div className={styles.toggleMobile} />
          <div className={styles.togglePC}>
            <div className={styles.profile}>
              <div className={styles.flex}>
                <AvatarRender avatarURL={characterAvatar} />
                <div className={styles.profilenames}>
                  <div className={styles.profilename}>{characterName}</div>
                  <div className={styles.profilesub}>{characterGuild}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <Notifications />
            <SettingsPopover characterData={characterParsed} setSettings={setSettingsWindow} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <SettingsWindow windowStatus={settingsWindowStatus} setWindow={setSettingsWindow} />
      <div className={styles.header}>
        <div className={styles.toggleMobile} />
        <div className={styles.togglePC}>
          <div className={styles.profile} />
        </div>
        <div className={styles.buttons}>
          <SettingsPopover characterData={undefined} setSettings={setSettingsWindow} />
        </div>
      </div>
    </div>
  )
}

export default Header
