import React from "react"
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { amber } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'

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
    <LocalizationProvider dateAdapter={ AdapterDateFns }>
      <ThemeProvider theme={createTheme(getDesignTokens('dark'))}>
        <CssBaseline />
        <MyRoutes />
      </ThemeProvider>
    </LocalizationProvider>
  )
}
