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

const Header = () => {
  return (
    <div>
      {/* PC View */}

      <div className={styles.header}>
        <div className={styles.toggleMobile}>
          <ToggleButton icon={<FaBars />}>pls notice me</ToggleButton>
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
          <ToggleButton icon={<FaCog />}>SETTING MODAL</ToggleButton>
        </div>
      </div>
    </div>
  )
}

export default Header
