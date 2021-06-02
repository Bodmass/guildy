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
    <>
      {ongoingCount > 0 ? (
        <>
          <div className={styles.title}>Ongoing Events</div>
          <div className={styles.ongoingList}>
            {eventData.map((event) => (
              <OngoingEventItem
                name={event.name}
                background={event.background}
                start={event.start}
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
            end={event.end}
            ongoing={event.ongoing}
          />
        ))}
      </div>
    </>
  )
}

const GuildyUpcoming = () => {
  const [eventData, setEventData] = useState([])
  const [ongoingCount, setOngoingCount] = useState(0)

  useMemo(() => {
    const EVENTDATA = []
    const TODAY = new Date()
    const DAYRANGE = new Date()
    DAYRANGE.setDate(TODAY.getDate() + DAYSTOEVENTLIMIT)

    HOLIDAYS.map((e) => {
      const STARTDATE = new Date(e.startDate)
      const ENDDATE = new Date(e.endDate)

      const holidayObject = {
        name: e.name,
        background: e.backgroundStart,
        ongoing: false,
        start: e.startDate,
        end: e.endDate,
      }

      if (e.endDate == null) {
        const NEWEND = new Date()
        NEWEND.setDate(STARTDATE.getDate() + 1)
        holidayObject.end = NEWEND.toDateString()
      }

      if (TODAY > STARTDATE) {
        if (TODAY < ENDDATE || e.endDate == null) {
          holidayObject.ongoing = true
          setOngoingCount(ongoingCount + 1)
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
    setEventData(EVENTDATA)
    setOngoingCount(ongoingCount)
  }, [])

  return (
    <div className={styles.upcomingEventsContainer}>
      <EventList eventData={eventData} ongoingCount={ongoingCount} />
    </div>
  )
}

export default GuildyUpcoming
