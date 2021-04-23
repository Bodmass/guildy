import { NextApiHandler } from 'next'
import { stringify } from 'querystring'
import { parseCookies } from 'nookies'
import jwt from 'jsonwebtoken'

const handler: NextApiHandler = (req, res) => {
  const redirectUri = `https://${req.query.region}.api.battle.net/?${stringify({
    access_token: JSON.parse((jwt.decode(JSON.parse(parseCookies().id)) as { [key: string]: string }).sessionToken)
      .access_token,
    namespace: `profile-${req.query.region}`,
    locale: 'enGB',
  })}`
  res.writeHead(301, { Location: redirectUri })
  res.end()
}

export default handler
