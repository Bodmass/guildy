import { NextApiHandler } from 'next'
import { stringify } from 'querystring'

const handler: NextApiHandler = (req, res) => {
  const redirectUri = `https://${req.query.region}.battle.net/oauth/authorize?${stringify({
    client_id: process.env.BLIZZARD_CLIENT_ID,
    redirect_uri: `http://localhost:3000/api/redirect`,
    scope: 'wow.profile',
    response_type: 'code',
    state: req.query.region,
  })}`
  res.writeHead(301, { Location: redirectUri })
  res.end()
}

export default handler
