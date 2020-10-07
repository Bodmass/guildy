import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.h1}>guildy</div>
      <div className={styles.h2}>
        <a className={styles.h2link} href="https://twitter.com">
          twitter
        </a>{' '}
        |{' '}
        <a className={styles.h2link} href="https://discord.com">
          discord
        </a>
      </div>
    </div>
  )
}

export default Footer
