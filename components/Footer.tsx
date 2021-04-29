import { FaTwitter, FaGithub } from 'react-icons/fa'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.logo} />
      <div className={styles.icons}>
        <a className={styles.icon} href="https://twitter.com/BodmassAD">
          <FaTwitter />
        </a>
        <a className={styles.icon} href="https://github.com/Bodmass/guildy">
          <FaGithub />
        </a>
      </div>
    </div>
  )
}

export default Footer
