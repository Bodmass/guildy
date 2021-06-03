import { useMemo, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import styles from './guildyupcoming.module.css'
import holidayData from '../public/data/holidays.json'

const HOLIDAYS = holidayData.holiday

const DAYSTOEVENTLIMIT = 30

function OngoingEventItem({ name, background, end, ongoing }) {
  const TODAY = new Date()
  const EVENTEND = new Date(end)
  const daysRemaining = differenceInCalendarDays(EVENTEND, TODAY)
  return (
    <>
      {ongoing ? (
        <div
          className={styles.eventItem}
          style={{ background: `url(/images/guildy/calendar/events/${background}.png)` }}
        >
          <div className={styles.eventTitle}>{name}</div>
          <>
            {daysRemaining > 1 ? (
              <div className={styles.eventInfo}>Ends in {daysRemaining} days</div>
            ) : (
              <div className={styles.eventInfo}>Ends in {daysRemaining} day</div>
            )}
          </>
        </div>
      ) : null}
    </>
  )
}

function UpcomingEventItem({ name, background, start, ongoing }) {
  const TODAY = new Date()
  const EVENTSTART = new Date(start)
  const daysRemaining = differenceInCalendarDays(EVENTSTART, TODAY)
  return (
    <>
      {ongoing ? null : (
        <div
          className={styles.eventItem}
          style={{ background: `url(/images/guildy/calendar/events/${background}.png)` }}
        >
          <div className={styles.eventTitle}>{name}</div>
          <>
            {daysRemaining > 1 ? (
              <div className={styles.eventInfo}>Starts in {daysRemaining} days</div>
            ) : (
              <div className={styles.eventInfo}>Starts in {daysRemaining} day</div>
            )}
          </>
        </div>
      )}
    </>
  )
}

function EventList({ eventData, ongoingCount }) {
  return (
    <div className={styles.fullEventList}>
      {ongoingCount > 0 ? (
        <>
          <div className={styles.title}>Ongoing Events</div>
          <div className={styles.ongoingList}>
            {eventData.map((event) => (
              <OngoingEventItem
                name={event.name}
                background={event.background}
                end={event.end}
                ongoing={event.ongoing}
              />
            ))}
          </div>
        </>
      ) : null}

      <div className={styles.title}>Upcoming Events</div>
      <div className={styles.eventList}>
        {eventData.map((event) => (
          <UpcomingEventItem
            name={event.name}
            background={event.background}
            start={event.start}
            ongoing={event.ongoing}
          />
        ))}
      </div>
    </div>
  )
}

const GuildyUpcoming = () => {
  const [eventData, setEventData] = useState([])
  const [ongoingCount, setOngoingCount] = useState(0)

  useMemo(() => {
    const EVENTDATA = []
    const TODAY = new Date()
    const DAYRANGE = new Date()
    let count = 0
    DAYRANGE.setDate(TODAY.getDate() + DAYSTOEVENTLIMIT)

    HOLIDAYS.map((e) => {
      const holidayObject = {
        name: e.name,
        background: e.backgroundStart,
        ongoing: false,
        start: e.startDate,
        end: e.endDate,
      }

      const STARTDATE = new Date(holidayObject.start)

      if (e.endDate == null) {
        const NEWEND = new Date()
        NEWEND.setDate(STARTDATE.getDate() + 1)
        holidayObject.end = NEWEND.toDateString()
      }

      const ENDDATE = new Date(holidayObject.end)

      if (TODAY > STARTDATE) {
        if (TODAY <= ENDDATE) {
          holidayObject.ongoing = true
          count += 1
          EVENTDATA.push(holidayObject)
          return null
        }
      }

      if (STARTDATE < DAYRANGE) {
        if (STARTDATE > TODAY) {
          EVENTDATA.push(holidayObject)
          return null
        }
      }
      return null
    })
    EVENTDATA.sort((a, b) => {
      return new Date(a.start).getTime() - new Date(b.start).getTime()
    })

    setEventData(EVENTDATA)
    setOngoingCount(count)
  }, [])

  return (
    <div className={styles.upcomingEventsContainer}>
      <EventList eventData={eventData} ongoingCount={ongoingCount} />
    </div>
  )
}

export default GuildyUpcoming
