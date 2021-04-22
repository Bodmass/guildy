import { useMemo, useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import BnetLogin from '../components/BnetLogin'
import Footer from '../components/Footer'
import Header from '../components/Header'
import BnetProfileList from '../components/BnetProfileList'
import GuildyCalendar from '../components/GuildyCalendar'

const bgArray = [
  'maw1.jpg',
  'maw2.jpg',
  'ardenweald1.jpg',
  'bastion1.jpg',
  'bastion2.jpg',
  'maldraxxus1.jpg',
  'maldraxxus2.jpg',
  'revendreth1.jpg',
  'revendreth2.jpg',
  'venari.jpg',
]

export default function Index() {
  const background = useMemo(() => {
    return bgArray[Math.floor(Math.random() * bgArray.length)]
  }, [])

  const [loginStatus, setLoginStatus] = useState(null)
  const [characterStatus, setCharacterStatus] = useState(null)
  const cookiesId = parseCookies().id
  const cookiesCharacter = parseCookies().character

  useEffect(() => {
    if (cookiesId === '{}') {
      // notloggedin
    } else {
      setLoginStatus(cookiesId)
    }

    if (cookiesCharacter === '{}') {
      // notloggedin
    } else {
      setCharacterStatus(cookiesCharacter)
    }
  }, [])

  if (loginStatus === undefined) {
    return (
      <>
        <style jsx global>
          {`
            body {
              background-color: black;
              background: no-repeat center/cover url(../images/backgrounds/${background});
            }
          `}
        </style>
        <BnetLogin />
        <Footer />
      </>
    )
  }

  if (characterStatus === undefined) {
    return (
      <>
        <style jsx global>
          {`
            body {
              background: no-repeat center/cover url(../images/backgrounds/${background});
            }
          `}
        </style>
        <Header />
        <BnetProfileList />
        <Footer />
      </>
    )
  }

  return (
    <>
      <style jsx global>
        {`
          body {
            background: no-repeat center/cover url(../images/backgrounds/${background});
          }
        `}
      </style>

      <Header />
      <GuildyCalendar />
      <Footer />
    </>
  )
}
