import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'jn-theme'

function getInitialTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    const isDark = theme === 'dark'
    root.classList.toggle('dark', isDark)
    root.style.colorScheme = isDark ? 'dark' : 'light'

    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) {
      themeColor.setAttribute('content', isDark ? '#09090A' : '#F6F1E7')
    }
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (event) => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setTheme(event.matches ? 'dark' : 'light')
        }
      } catch {
        setTheme(event.matches ? 'dark' : 'light')
      }
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Storage can be unavailable in private browsing; the theme still switches.
      }
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
