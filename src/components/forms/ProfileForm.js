import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import AlertSnackbar from '../../components/AlertSnackbar'

export default function ProfileForm({ currentUser, setCurrentUser }) {
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
    let updateUserProfile = true

    const updateUser = async () => {
      const data = {
        first_name: values.firstName,
        last_name: values.lastName
      }
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId
      // PATCH /users/:user_id
      await fetch( endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      // GET /users/:user_id
      const getUser = await fetch( endpoint, {method: 'GET'})
      const user = await getUser.json()
      if (updateUserProfile) {
        setCurrentUser(user)
        setSnackbarOpen(!snackbarOpen)
      }
    }

    updateUser()
    return () => {
      updateUserProfile = false
    }
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
          value={values.firstName || ''}
          onChange={handleChange('firstName')}
          sx={{ m: 1, width: '50vh' }}
        />
        <TextField
          id="outlined"
          label="Last Name"
          value={values.lastName || ''}
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
