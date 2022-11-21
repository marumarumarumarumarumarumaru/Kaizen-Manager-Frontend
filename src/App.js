import React from "react"
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { amber } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'

import MyRoutes from "./Routes"

export default function App() {
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        ...amber,
        ...(mode === 'dark' && {
          main: amber[300],
        }),
      }
    },
  })
  
  return (
    <ThemeProvider theme={createTheme(getDesignTokens('dark'))}>
      <CssBaseline />
      <MyRoutes />
    </ThemeProvider>
  )
}
