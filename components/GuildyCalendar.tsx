import { useState } from 'react'
import { Calendar } from 'react-calendar'
import { differenceInCalendarDays } from 'date-fns'
import styles from './guildycalendar.module.css'

const WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const EVENTS = [
  {
    name: 'Heroic Clearing!',
    type: 'Raid',
    instance: 'sl-castle-nathria',
    date: '11 Feb 2021 15:30:00 GMT',
  },
  {
    name: 'Mythic!',
    type: 'Raid',
    instance: 'sl-castle-nathria',
    date: '09 Feb 2021 15:30:00 GMT',
  },
  {
    name: 'M+ w/ QQQueens',
    type: 'Dungeon',
    instance: 'sl-spires-of-acension',
    date: '11 Feb 2021 19:30:00 GMT',
  },
  {
    name: 'Test',
    type: 'Dungeon',
    instance: 'sl-spires-of-acension',
    date: '12 Feb 2021 19:30:00 GMT',
  },
  {
    name: 'Test',
    type: 'Dungeon',
    instance: 'sl-spires-of-acension',
    date: '12 Feb 2021 19:30:00 GMT',
  },
  {
    name: 'Test',
    type: 'Dungeon',
    instance: 'sl-spires-of-acension',
    date: '12 Feb 2021 19:30:00 GMT',
  },
  {
    name: 'BDAY!!',
    type: 'Misc',
    instance: 'misc',
    date: '5 Feb 2021 00:00:00 GMT',
  },
  {
    name: 'Ben day!!',
    type: 'Misc',
    instance: 'misc',
    date: '19 May 2021 00:00:00 GMT',
  },
  {
    name: 'Test',
    type: 'Misc',
    instance: 'misc',
    date: '1 Mar 2021 00:00:00 GMT',
  },
]

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0
}

function TileDisabled(x) {
  return x.activeStartDate.getMonth() !== x.date.getMonth()
}

function TileClassName({ date, _view }) {
  const TODAY = new Date()
  if (isSameDay(TODAY, date)) {
    return styles.calendarToday
  }

  return ''
}

function TileContent({ date, _view }) {
  const tileEvents = []
  EVENTS.map((e) => {
    const DAY = new Date(Date.parse(e.date))
    if (isSameDay(DAY, date)) {
      tileEvents.push(e)
    }
    return ''
  })

  if (tileEvents.length === 0) {
    return ''
  }

  if (tileEvents.length > 1) {
    tileEvents.sort((a, b) => new Date(Date.parse(a.date)).getTime() - new Date(Date.parse(b.date)).getTime())
  }

  if (tileEvents.length > 4) {
    return (
      <div className={styles.tiles}>
        <div className={styles.tileEventAlt}>
          <a>{tileEvents.length}+ Events</a>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.tiles}>
      {tileEvents.map((event) => (
        <div
          className={styles.tileEvent}
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log(event.name)
          }}
          onKeyUp={() => {}}
          role="button"
          tabIndex={0}
        >
          <a>{event.name}</a>
        </div>
      ))}
    </div>
  )
}

const GuildyCalendar = () => {
  const [value, onChange] = useState(new Date())
  return (
    <div>
      <Calendar
        calendarType="ISO 8601"
        className={styles.calendarContainer}
        tileClassName={TileClassName}
        onChange={onChange}
        value={value}
        view="month"
        formatShortWeekday={(locale, date) => WEEKDAY[new Date(date).getDay()]}
        // formatShortWeekday={(locale, date) => date.toString('dddd, , ')}
        showFixedNumberOfWeeks
        tileDisabled={TileDisabled}
        tileContent={TileContent}
        onDrillUp={() => {}}
        onDrillDown={() => {}}
        minDetail="month"
        maxDetail="month"
      />
    </div>
  )
}

export default GuildyCalendar
