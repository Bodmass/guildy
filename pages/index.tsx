import { useMemo } from 'react'
import BnetLogin from '../components/BnetLogin'
import Footer from '../components/Footer'
import Header from '../components/Header'

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
  return (
    <div>
      <style jsx global>
        {`
          body {
            background: no-repeat center/cover url(../images/backgrounds/${background});
          }
        `}
      </style>
      <Header />
      <BnetLogin />
      <Footer />
    </div>
  )
}
