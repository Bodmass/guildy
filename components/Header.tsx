import { useState } from 'react'
import { FaBell, FaCog, FaCaretDown, FaBars } from 'react-icons/fa'
import styles from './header.module.css'

function ToggleButton({ icon, children }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <a href="#" className={styles.button} onClick={() => setOpen(!open)}>
        {icon}
      </a>
      {open && children}
    </>
  )
}

function SettingModal() {
  function SettingModalItem({ children }: any) {
    return (
      <a href="#'" className={styles.menuitem}>
        {children}
      </a>
    )
  }
  return (
    <div className={styles.settingmodal}>
      <div className={styles.settingmodalheader} />
      <div className={styles.settingmodalnav}>
        <SettingModalItem>General</SettingModalItem>
        <SettingModalItem>Delete Account</SettingModalItem>
        <SettingModalItem>Logout</SettingModalItem>
      </div>
      <div className={styles.settingmodalfill} />
    </div>
  )
}

function DropdownMenu() {
  function DropdownItem({ rightIcon, children }: any) {
    return (
      <a href="#'" className={styles.menuitem}>
        {children}
        <span className="icon-right">{rightIcon}</span>
      </a>
    )
  }

  return (
    <div className={styles.dropdown}>
      <DropdownItem>
        <div className={styles.profileimage} />
        CHARACTER NAME
      </DropdownItem>
      <DropdownItem leftIcon={<FaBell />} rightIcon={<FaCaretDown />}>
        {' '}
        My Characters{' '}
      </DropdownItem>
      <DropdownItem>
        <div className={styles.profileimage} />
        GUILD NAME
      </DropdownItem>
    </div>
  )
}

const Header = () => {
  return (
    <div>
      {/* PC View */}

      <div className={styles.header}>
        <div className={styles.toggleMobile}>
          <ToggleButton icon={<FaBars />}>
            <DropdownMenu />
          </ToggleButton>
        </div>
        <div className={styles.togglePC}>
          <div className={styles.profile}>
            <div className={styles.flex}>
              <div className={styles.profileimage} />
              <div className={styles.profilename}>Character Name</div>
            </div>
            <div className={styles.caret}>
              <FaCaretDown />
            </div>
          </div>
          <div className={styles.profile}>
            <div className={styles.flex}>
              <div className={styles.profileimage} />
              <div className={styles.profilename}>Guild Name</div>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <FaBell />
          </div>
          <ToggleButton icon={<FaCog />}>
            <SettingModal />
          </ToggleButton>
        </div>
      </div>
    </div>
  )
}

export default Header
