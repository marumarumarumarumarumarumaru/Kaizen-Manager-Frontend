import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AlertSnackbar from '../../components/AlertSnackbar'

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

  // const [values, setValues] = React.useState({
  // })

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }

  const handleSubmit = () => {
    setSnackbarOpen(!snackbarOpen)
  }

  return (
    <Box sx={{
      m: 2,
      flexsDirection: 'column'
    }}>
      <Typography variant="h4">
        General Settings
      </Typography>
      <Typography variant="caption">
        Edit below to adjust your Kaizen Manager general settings.
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingY: 2
        }}
      >
        {/* Add any options here */}
      </Box>
      <Button variant='contained' onClick={handleSubmit}>Save</Button>
      <AlertSnackbar 
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Setting saved'}
      />
    </Box>
  )
}
