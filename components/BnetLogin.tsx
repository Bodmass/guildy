import { useContext, useMemo, useState } from 'react'
import { destroyCookie, parseCookies } from 'nookies'
import styles from './bnetlogin.module.css'
import UserContext from './UserContext'

const REGIONS = ['us', 'eu', 'KR', 'TW', 'CN']

function BattleNetLoginButton({ text, link, region }) {
  return (
    <div>
      <a type="button" className={styles.button} href={link}>
        <div className={styles.buttontext}>
          {text} {region}
        </div>
      </a>
    </div>
  )
}

function RegionDD({ Region, setRegion }) {
  // Map Dropdown List Instead
  return (
    <>
      <div className={styles.dropdown}>
        <a>{Region}</a>
        <div className={styles.dropdownContent}>
          {/* {REGIONS.map((e) => (
            <button type="button" onClick={() => setRegion('0')}>
              {REGIONS[e]}
            </button>
          ))} */}
          <button type="button" onClick={() => setRegion(REGIONS[0])}>
            US
          </button>
          <button type="button" onClick={() => setRegion(REGIONS[1])}>
            EU
          </button>
        </div>
      </div>
    </>
  )
}

function LoginContainer() {
  const { loginStatus, setLoginStatus } = useContext(UserContext)

  const [Region, setRegion] = useState(REGIONS[0])
  const cookies = parseCookies().id

  useMemo(() => {
    if (cookies === '{}') {
      // notloggedin
    } else {
      setLoginStatus(cookies)
    }
  }, [])

  if (loginStatus === undefined) {
    return (
      <div className={styles.fullContainer}>
        <div className={styles.logo} />
        <RegionDD Region={Region} setRegion={setRegion} />
        <div className={styles.loginContainer}>
          <BattleNetLoginButton
            text="Login with Battle.net"
            // link={`https://${Region}.battle.net/oauth/authorize?scope`}
            link={`http://localhost:3000/api/login?region=${Region}`}
            region={Region}
          />
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
