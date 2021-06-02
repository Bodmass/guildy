import GuildyCalendar from "./GuildyCalendar"
import GuildyUpcoming from "./GuildyUpcoming"
import styles from './guildycontent.module.css'

const GuildyContent = () => {
  return (
    <div className={styles.guildyContent}>
      <GuildyCalendar />
      <GuildyUpcoming />
    </div>
  )
}

export default GuildyContent
