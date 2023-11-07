import React from "react";

export const ThemeContext = React.createContext('light');

export const useTheme = () => React.useContext(ThemeContext)

export function ThemeProvider({children}: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState('light')

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}