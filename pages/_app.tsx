import './styles.css'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import useFathom from '../components/hooks/useFathom'
import SEO from '../next-seo.config'

function App({ Component, pageProps }) {
  useFathom()
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fd015d" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22> <text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>"
        />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default App
