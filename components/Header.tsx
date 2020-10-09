import { FaBell, FaCog, FaCaretDown } from 'react-icons/fa'
import styles from './header.module.css'

const Header = () => {
  return (
    <div>
      <div className={styles.header}>
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
        <div className={styles.buttons}>
          <div className={styles.button}>
            <FaBell />
          </div>
          <div className={styles.button}>
            <a className={styles.buttonhover} href="#">
              <FaCog />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
