import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {}
})

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)

  // Check for saved theme preference or use system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setDarkMode(prefersDark)
    }
  }, [])

  // Update theme when it changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-theme")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark-theme")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}
