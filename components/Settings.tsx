import { useState, useContext, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { parseCookies, setCookie } from 'nookies'
import styles from './settings.module.css'
import { ThemeContext } from './contexts/theme'

const OPTIONS = ['General', 'Character', 'Account ', 'Support']
const NINETY_DAYS = +1000 * 60 * 60 * 24 * 90

const bgArray = [
  'maw1.jpg',
  'maw2.jpg',
  'ardenweald1.jpg',
  'bastion1.jpg',
  'bastion2.jpg',
  'maldraxxus1.jpg',
  'maldraxxus2.jpg',
  'revendreth1.jpg',
  'revendreth2.jpg',
  'venari.jpg',
]

function SettingsList({ options, setOption }) {
  const handleMenuItemClick = (event, index) => {
    setOption(index)
  }
  return (
    <MenuList subheader={<li />} style={{ padding: '5px' }}>
      {options.map((option, index) => (
        <MenuItem
          style={{
            width: `100%`,
            height: `3rem`,
            backgroundColor: `var(--color-background-shade-4)`,
            color: `#fff`,
            border: `0.15rem solid var(--color-background-shade-1)`,
            marginBottom: `0.25rem`,
          }}
          key={index}
          onClick={(event) => handleMenuItemClick(event, index)}
        >
          {option}
        </MenuItem>
      ))}
    </MenuList>
  )
}

function Options({ optionSelected }) {
  const { colorMode, setColorMode } = useContext(ThemeContext)

  const [state, setState] = useState({
    language: 'english',
    theme: 'dark',
  })

  useEffect(() => {
    if (colorMode) {
      setState({ ...state, theme: colorMode })
    }
  }, [])

  const handleChange = (event) => {
    const { name } = event.target
    setState({
      ...state,
      [name]: event.target.value,
    })

    if (name === 'theme') {
      setColorMode(state.theme === 'light' ? `dark` : 'light')
    }
  }
  if (optionSelected === 0) {
    return (
      <div className={styles.contextPane}>
        <div className={styles.contextPaneOption}>
          <span>Language</span>
          <FormControl>
            <Select
              native
              value={state.language}
              onChange={handleChange}
              label="Language"
              inputProps={{
                name: 'language',
                id: 'outlined-age-native-simple',
              }}
              style={{
                width: '10rem',
                fontSize: '0.8rem',
                color: '#000',
                backgroundColor: '#fff',
                padding: '0.25rem',
                fontWeight: 'bold',
              }}
            >
              <option value="en_GB">English</option>
              <option value="es_ES">Español</option>
              <option value="de_DE">Deutsch</option>
              <option value="fr_FR">Français</option>
              <option value="it_IT">Italiano</option>
              <option value="pt_BR">Português</option>
              <option value="gr_GR">Русский</option>
              <option value="ko_KR">한국어</option>
              <option value="zh_TW">繁體中文</option>
            </Select>
          </FormControl>
        </div>
        <div className={styles.contextPaneOption}>
          <span>Theme</span>
          <FormControl>
            <Select
              native
              value={state.theme}
              onChange={handleChange}
              label="Theme"
              inputProps={{
                name: 'theme',
                id: 'outlined-age-native-simple',
              }}
              style={{
                width: '10rem',
                fontSize: '0.8rem',
                color: '#000',
                backgroundColor: '#fff',
                padding: '0.25rem',
                fontWeight: 'bold',
              }}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </Select>
          </FormControl>
        </div>
        <div className={styles.contextPaneOption}>
          <span>Background</span>

          <div className={styles.bgGrid}>
            <div className={styles.bgGridComponent}>
              <span>RANDOM</span>
            </div>
            {bgArray.map((index) => (
              <div
                className={styles.bgGridComponent}
                style={{ background: `no-repeat center/cover url(../images/backgrounds/${index})` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  if (optionSelected === 1) {
    return (
      <div className={styles.contextPane}>
        <span>Theme</span>
      </div>
    )
  }
  if (optionSelected === 2) {
    return (
      <div className={styles.contextPane}>
        <span>Account Settings</span>
      </div>
    )
  }
  if (optionSelected === 3) {
    return (
      <div className={styles.contextPane}>
        <span>Support</span>
      </div>
    )
  }
  return <div className={styles.contextPane} />
}

const SettingsWindow = ({ windowStatus, setWindow }) => {
  const [optionSelected, setOption] = useState(0)

  if (!parseCookies().settings) {
    const settings = { language: 'en-gb', timezone: '0', appTheme: 'dark', bg: 0, calendarTheme: 0 }
    setCookie(null, 'settings', JSON.stringify(settings), {
      expires: new Date(Date.now() + NINETY_DAYS),
      sameSite: 'Lax',
      path: '/',
    })
  }

  if (windowStatus === false) {
    return null
  }
  return (
    <div className={styles.settingsMode}>
      <div className={styles.settingsPane}>
        <div className={styles.menuBar}>
          <div
            role="button"
            className={styles.closeSettings}
            onKeyDown={() => {
              setWindow(false)
            }}
            onClick={() => {
              setWindow(false)
            }}
            tabIndex={0}
          >
            <FaTimes />
          </div>
        </div>
        <div className={styles.splitPane}>
          <div className={styles.selectionPane}>
            <SettingsList options={OPTIONS} setOption={setOption} />
          </div>
          <Options optionSelected={optionSelected} />
        </div>
      </div>
    </div>
  )
}

export default SettingsWindow
