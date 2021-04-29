import { FaTwitter, FaDiscord } from 'react-icons/fa'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.logo} />
      <div className={styles.icons}>
        <a className={styles.icon} href="https://twitter.com">
          <FaTwitter />
        </a>
        <a className={styles.icon} href="https://discord.com">
          <FaDiscord />
        </a>
      </div>
    </div>
  )
}

export default Footer
