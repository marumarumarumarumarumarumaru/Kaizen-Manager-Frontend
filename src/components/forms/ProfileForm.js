import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import AlertSnackbar from '../../components/AlertSnackbar'

export default function ProfileForm() {
  /* 
    Page component for rendering the Profile Settings page's form
  */
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: ''
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = () => {
    setSnackbarOpen(!snackbarOpen)
  }

  return (
    <>
      <Box sx={{ display: 'flex', 'flexDirection': 'column' }}>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Name
        </Typography>
        <Typography variant="caption">
          Edit below to adjust your name that you use on Kaizen Manager.
        </Typography>
        <Typography variant="caption">
          Note: If you hit "save" without changing anything, nothing will be updated.
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingY: 2
        }}
      >
        <TextField
          id="outlined"
          label="First Name"
          value={values.firstName ?? ''}
          onChange={handleChange('firstName')}
          sx={{ m: 1, width: '50vh' }}
        />
        <TextField
          id="outlined"
          label="Last Name"
          value={values.lastName ?? ''}
          onChange={handleChange('lastName')}
          sx={{ m: 1, width: '50vh' }}
        />
      </Box>
      <Button variant='contained' onClick={handleSubmit}>Save</Button>
      <AlertSnackbar 
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Settings updated'}
      />
    </>
  )
}
