import { useEffect, Dispatch, SetStateAction, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import styles from './bnetlogin.module.css'

const REGIONS = ['us', 'eu', 'kr', 'tw', 'cn']
const APAC_REGION_ID = 4
const NINETY_DAYS = +1000 * 60 * 60 * 24 * 90

function BattleNetLoginButton({ text, region }: { text: string; region: string }) {
  // WoW China requires a different API call as it doesn't use same as Global.
  if (region === 'cn') {
    return (
      <div>
        <a type="button" className={styles.buttonDisabled}>
          <div className={styles.buttontext}>WoW China Not Yet Supported</div>
        </a>
      </div>
    )
  }

  return (
    <div className={styles.loginButtonContainer}>
      <a type="button" className={styles.button} href={`/api/login?region=${region}`}>
        <div className={styles.buttontext}>{text}</div>
      </a>
    </div>
  )
}

function RegionDD({ region, setRegion }: { region: string; setRegion: Dispatch<SetStateAction<string>> }) {
  return (
    <>
      <div className={styles.dropdown}>
        <div className={styles.dropdownText}>
          <a>{region}</a>
        </div>

        <div className={styles.dropdownContent}>
          {REGIONS.map((option, index) => (
            <button
              key={option}
              disabled={index === APAC_REGION_ID}
              type="button"
              onClick={() => {
                setRegion(option)
                setCookie(null, 'region', option, {
                  expires: new Date(Date.now() + NINETY_DAYS),
                  sameSite: 'Lax',
                  path: '/',
                })
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

function LoginContainer() {
  const [loginStatus, setLoginStatus] = useState(null)
  const [region, setRegion] = useState(() => parseCookies().region || REGIONS[0])
  const cookies = parseCookies().id

  useEffect(() => {
    if (cookies === '{}') {
      // notloggedin
    } else {
      setLoginStatus(cookies)
    }
  }, [])

  if (loginStatus === undefined) {
    return (
      <div className={styles.fullContainer}>
        <div className={styles.logo}>
          <img src="/images/guildy/guildyLogo.png" alt="" draggable={false} />
        </div>
        <div className={styles.loginContainer}>
          <RegionDD region={region} setRegion={setRegion} />
          <BattleNetLoginButton text="Login with Battle.net" region={region} />
        </div>
      </div>
    )
  }

  // Temporary Logout, will remove and leave return empty
  return (
    <div>
      <div className={styles.fullContainer}>
        <div className={styles.loginContainer}>
          <div>
            <a
              type="button"
              className={styles.button}
              href="/"
              onClick={() => {
                destroyCookie(null, 'id')
              }}
            >
              <div className={styles.buttontext}>Logout</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const BnetLogin = () => {
  return (
    <>
      <LoginContainer />
    </>
  )
}

export default BnetLogin
