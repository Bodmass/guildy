import { useMemo } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const bgArray = ['maw1.jpg', 'ardenweald1.jpg', 'bastion1.jpg', 'maldraxxus1.jpg', 'revendreth1.jpg']
export default function Index() {
  const background = useMemo(() => {
    return bgArray[Math.floor(Math.random() * bgArray.length)]
  }, [])
  return (
    <div>
      <style jsx global>{`
        body {
          background: no-repeat center/cover url(../images/backgrounds/${background});
        }
      `}</style>
      <Header />
      <Footer />
    </div>
  )
}
