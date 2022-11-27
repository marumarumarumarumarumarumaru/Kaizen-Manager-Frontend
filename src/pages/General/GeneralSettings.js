import React from 'react'
import { Box, Typography } from '@mui/material'

import AlertSnackbar from '../../components/AlertSnackbar'

/**
 * Renders the General Settings page
 * 
 * @param {function} setShowDrawer 
 * @param {function} setCurrentProject 
 * 
 * @returns render()
 */
export default function GeneralSettings({ setShowDrawer, setCurrentProject }) {
  /* 
    Page component for rendering the General Settings page
  */
  React.useEffect(() => {
    setShowDrawer(true)
    setCurrentProject(null)
  })

  return (
    <>
      <GeneralSettingsForm/>
    </>
  )
}

function GeneralSettingsForm() {
  /* 
    Page component for rendering the Profile Settings page's form
  */
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const handleSubmit = () => {
    setSnackbarOpen(!snackbarOpen)
  }

  return (
    <Box sx={{
      m: 2,
      flexsDirection: 'column'
    }}>
      <Typography variant='h4'>
        General Settings
      </Typography>
      <Typography variant='subtitle1' sx={{ mt: 1 }}>
        Edit below to adjust your Kaizen Manager general settings.
      </Typography>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingY: 2
        }}
      >
        {/* Add any options here */}
      </Box>
      <Button variant='contained' onClick={handleSubmit} disabled>Save</Button>
      <AlertSnackbar 
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Setting saved'}
      />
    </Box>
  )
}
