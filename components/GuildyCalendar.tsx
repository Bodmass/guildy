import { useState } from 'react'
import { Calendar } from 'react-calendar'
import { differenceInCalendarDays } from 'date-fns'
import styles from './guildycalendar.module.css'
import holidayData from '../public/data/holidays.json'

const WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const HOLIDAYS = holidayData.holiday

const EVENTS = [
  {
    name: 'Heroic Clearing!',
    type: 'Raid',
    instance: 'sl-castle-nathria',
    startDate: '11 Feb 2021 15:30:00 GMT',
  },
]

function getDaysArray(s, e) {
  let a = []
  const d = new Date(s)
  for (a = [], d; d <= e; d.setDate(d.getDate() + 1)) {
    a.push(new Date(d))
  }
  return a
}

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

  return null
}

function TileContent({ date, _view }) {
  const tileEvents = []

  let urlBackground = ''
  EVENTS.map((e) => {
    const DAY = new Date(Date.parse(e.startDate))
    if (isSameDay(DAY, date)) {
      tileEvents.push(e)
    }
    return null
  })

  HOLIDAYS.map((e) => {
    const DAY = new Date(e.startDate)
    const dayList = getDaysArray(new Date(e.startDate), new Date(e.endDate))

    dayList.map((day) => {
      if (isSameDay(day, date)) {
        if (e.backgroundOngoing) urlBackground = e.backgroundOngoing
      }
      return null
    })

    if (isSameDay(DAY, date)) {
      if (e.backgroundStart) {
        urlBackground = e.backgroundStart
      }
      if (e.endDate != null) {
        const newPairs = { isStart: 'true', displayName: `${e.name} begins` }
        Object.assign(e, newPairs)
      }
      tileEvents.push(e)
    } else if (e.endDate != null) {
      const DAYEND = new Date(e.endDate)
      if (isSameDay(DAYEND, date)) {
        if (e.backgroundEnd) {
          urlBackground = e.backgroundEnd
        }
        const newPairs = { isStart: 'false', displayName: `${e.name} ends` }
        Object.assign(e, newPairs)
        tileEvents.push(e)
      }
    }

    return null
  })

  if (tileEvents.length === 0 && urlBackground === '') {
    return null
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
    <div
      className={styles.tiles}
      style={{ background: `url(/images/guildy/calendar/events/${urlBackground}.png) top left 11% ` }}
    >
      {tileEvents.map((event) => (
        <div className={styles.tileEvent} onClick={() => {}} onKeyUp={() => {}} role="button" tabIndex={0}>
          {event.displayName ? <a>{event.displayName}</a> : <a>{event.name}</a>}
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
