import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import styles from './settings.module.css'

const OPTIONS = ['General', 'Theme', 'Account Settings', 'Support']

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
            backgroundColor: `#202020`,
            color: `#fff`,
            border: `0.15rem solid black`,
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
  if (optionSelected === 0) {
    return (
      <div className={styles.contextPane}>
        <span>General</span>
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
  const [optionSelected, setOption] = useState(null)

  if (windowStatus === false) {
    return (
      <div>
        <span />
      </div>
    )
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
