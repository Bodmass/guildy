import { createContext, useState, useEffect, FC } from 'react'

export const ThemeContext = createContext<{
  colorMode: undefined | 'dark' | 'light'
  setColorMode: (value: 'dark' | 'light') => void
}>({ colorMode: undefined, setColorMode: () => undefined })

export const ThemeProvider: FC = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState(undefined)
  useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.classList.contains('light') ? 'light' : 'dark'
    rawSetColorMode(initialColorValue)
  }, [])
  const setColorMode = (newValue: 'dark' | 'light') => {
    rawSetColorMode(newValue)
    localStorage.setItem('color-mode', newValue)
    window.document.documentElement.classList.remove(newValue === 'light' ? 'dark' : 'light')
    window.document.documentElement.classList.add(newValue === 'light' ? 'light' : 'dark')
  }
  return <ThemeContext.Provider value={{ colorMode, setColorMode }}>{children}</ThemeContext.Provider>
}
