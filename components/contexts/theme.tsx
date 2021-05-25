import { createContext, useState, useEffect, FC } from 'react'

export const ThemeContext = createContext<{
  colorMode: undefined | 'dark' | 'light'
  themeMode: undefined | 'wow' | 'minimal' | 'minimal-light'
  setColorMode: (value: 'dark' | 'light') => void
  setThemeMode: (value: 'wow' | 'minimal' | 'minimal-light') => void
}>({ colorMode: undefined, setColorMode: () => undefined, themeMode: undefined, setThemeMode: () => undefined })

export const ThemeProvider: FC = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState(undefined)
  const [themeMode, rawSetThemeMode] = useState(undefined)
  useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.classList.contains('light') ? 'light' : 'dark'
    const initialThemeValue = (() => {
      if (root.classList.contains('minimal-light')) return 'minimal-light'
      if (root.classList.contains('minimal')) return 'minimal'
      return 'wow'
    })()
    rawSetColorMode(initialColorValue)
    rawSetThemeMode(initialThemeValue)
  }, [])
  const setColorMode = (newValue: 'dark' | 'light') => {
    rawSetColorMode(newValue)
    localStorage.setItem('color-mode', newValue)
    window.document.documentElement.classList.remove(newValue === 'light' ? 'dark' : 'light')
    window.document.documentElement.classList.add(newValue === 'light' ? 'light' : 'dark')
  }
  const setThemeMode = (newValue: 'minimal' | 'wow' | 'minimal-light') => {
    rawSetThemeMode(newValue)

    localStorage.setItem('calendar-theme', newValue)
    window.document.documentElement.classList.remove('wow', 'minimal', 'minimal-light')
    // window.document.documentElement.classList.add(newValue === 'wow' ? 'minimal' : 'wow')
    window.document.documentElement.classList.add(newValue)
  }
  return (
    <ThemeContext.Provider value={{ colorMode, themeMode, setColorMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
