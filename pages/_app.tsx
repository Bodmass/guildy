import './styles.css'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import useFathom from '../components/hooks/useFathom'
import { ThemeProvider } from '../components/contexts/theme'
import SEO from '../next-seo.config'
import './calendar.css'

const darkModeJs = `
  ((function () {
    function getInitialColourMode () {
      const persistedColorPreference = window.localStorage.getItem('color-mode');
      const hasPersistedPreference = typeof persistedColorPreference === 'string';
      // If the user has explicitly chosen light or dark, let's use it.
      // Otherwise, this value will be null.
      if (hasPersistedPreference) {
        return persistedColorPreference;
      }
      // If they haven't been explicit, let's check the media query
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const hasMediaQueryPreference = typeof mql.matches === 'boolean';
      if (hasMediaQueryPreference) {
        return mql.matches ? 'dark' : 'light';
      }
      // If they are using a browser/OS that doesn't support
      // color themes, let's default to 'dark'.
      return 'dark';
    }
    const colorMode = getInitialColourMode();
    const root = document.documentElement;
    root.classList.add(colorMode === 'light' ? 'light' : 'dark');
  })())
`

function App({ Component, pageProps }) {
  useFathom()
  return (
    <>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: darkModeJs }} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fd015d" />
        <link rel="icon" href="/images/icon.svg" />
      </Head>
      <DefaultSeo {...SEO} />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
