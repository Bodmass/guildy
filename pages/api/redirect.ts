import { NextApiHandler } from 'next'
import fetch from 'isomorphic-fetch'
import { stringify } from 'querystring'
import base64 from 'base-64'
import { setCookie } from 'nookies'

const handler: NextApiHandler = async (req, res) => {
  const result = await fetch(
    `https://${req.query.state}.battle.net/oauth/token?${stringify({
      redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/redirect`,
      scope: 'wow.profile',
      grant_type: 'authorization_code',
      code: req.query.code,
    })}`,
    {
      headers: {
        Authorization: `Basic ${base64.encode(
          `${process.env.BLIZZARD_CLIENT_ID}:${process.env.BLIZZARD_CLIENT_SECRET}`
        )}`,
      },
      method: 'POST',
    }
  )
  const data = await result.json()
  setCookie({ res }, 'id', JSON.stringify(data), {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
    sameSite: 'Lax',
    path: '/',
  })
  res.writeHead(301, { Location: '/' })
  res.end()
}

export default handler
