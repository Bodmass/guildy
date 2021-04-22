import { NextApiHandler } from 'next'
import { stringify } from 'querystring'
import { parseCookies } from 'nookies'

const handler: NextApiHandler = (req, res) => {
  const redirectUri = `https://${req.query.region}.api.battle.net/?${stringify({
    access_token: parseCookies().id[1],
    namespace: `profile-${req.query.region}`,
    locale: 'enGB',
  })}`
  res.writeHead(301, { Location: redirectUri })
  res.end()
}

export default handler
