const title = 'Guildy'
const description = 'World of Warcraft Guild Calendar and Management Tool!'
const url = 'https://guildywow.herokuapp.com/'

module.exports = {
  title,
  description,
  canonical: url,
  openGraph: {
    title,
    description,
    url,
    site_name: title,
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    handle: '@bodmassad',
    site: '@bodmassad',
    cardType: 'summary_large_image',
  },
}
