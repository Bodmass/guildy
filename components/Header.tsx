import styles from './header.module.css'

const Header = () => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.profileimage} />
          Character Name
        </div>
        <div className={styles.profile}>
          <div className={styles.profileimage} />
          Guild
        </div>
        <div className={styles.buttons}>
          <div className={styles.button}>?</div>
          <div className={styles.button}>
            <a className={styles.buttonhover} href="#">
              ⚙
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
