import Document, { Html, Head, Main, NextScript } from 'next/document'

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

const calendarThemeJs = `
  ((function () {
    function getInitialTheme () {
      const persistedThemePreference = window.localStorage.getItem('calendar-theme');
      const hasPersistedPreference = typeof persistedThemePreference === 'string';

      if (hasPersistedPreference) {
        return persistedThemePreference;
      }
      return 'wow';
    }
    const calendarTheme = getInitialTheme();
    const root = document.documentElement;

    if(calendarTheme === 'minimal-light')
    {
      root.classList.add('minimal-light');
    }
    else if(calendarTheme === 'minimal')
    {
      root.classList.add('minimal');
    }
    else{
      root.classList.add('wow');
    }
  })())
`

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: darkModeJs }} />
          <script dangerouslySetInnerHTML={{ __html: calendarThemeJs }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
