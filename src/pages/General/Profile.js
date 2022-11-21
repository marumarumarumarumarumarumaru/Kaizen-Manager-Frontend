import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
// For the dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { Link } from 'react-router-dom'

import { Main, DrawerHeader } from '../../components/CustomUI';
import AlertSnackbar from '../../components/AlertSnackbar'
import ResponsiveAppBar from '../../components/appBar/ResponsiveAppBar'
import ResponsiveDrawer from '../../components/drawer/ResponsiveDrawer'

export default function Profile({ dataLoaded, drawerOpen, setDrawerOpen, drawerWidth, projects, users, workspaces, currentWorkspace, setCurrentWorkspace, currentUser, setCurrentProject }) {
  /* 
    Page component for rendering the Profile Settings page
  */
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  const handleDeleteAccountClickOpen = () => {
    setDeleteOpen(!deleteOpen)
  }

  return (
    <>
      {dataLoaded 
        ? <Box sx={{ display: 'flex' }}>
            <ResponsiveAppBar 
              drawerOpen={drawerOpen} 
              setDrawerOpen={setDrawerOpen} 
              drawerWidth={drawerWidth} 
              workspaces={workspaces}
              setCurrentWorkspace={setCurrentWorkspace}
              currentUser={currentUser}
            />
            <ResponsiveDrawer 
              drawerOpen={drawerOpen} 
              setDrawerOpen={setDrawerOpen} 
              drawerWidth={drawerWidth}
              projects={projects}
              users={users}
              workspaces={workspaces}
              currentWorkspace={currentWorkspace}
              setCurrentProject={setCurrentProject}
            />
            <Main open={drawerOpen}>
              <DrawerHeader />
              <Box sx={{
                m: 2,
                flexsDirection: 'column',
              }}>
                <Typography variant="h4">
                  Profile Settings
                </Typography>
                <Typography variant="caption">
                  Edit below to update your user profile on Kaizen Manager.
                </Typography>
              </Box>
              <ProfileForm />
              <PasswordForm />
              <DeleteAccount openDialog={handleDeleteAccountClickOpen}/>
            </Main>
            <DeleteAccountDialog open={deleteOpen} setOpen={setDeleteOpen}/>
          </Box>
        : <CircularProgress />
      }
    </>
  )
}

function ProfileForm() {
  /* 
    Page component for rendering the Profile Settings page's form
  */
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = () => {
    setSnackbarOpen(!snackbarOpen)
  }

  return (
    <Box sx={{
      m: 2,
      flexDirection: 'column'
    }}>
      <Box sx={{ display: 'flex', 'flexDirection': 'column' }}>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Name and Email
        </Typography>
        <Typography variant="caption">
          Edit below to adjust your name and email that you use on Kaizen Manager.
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
        <TextField
          id="outlined"
          label="Email"
          type="email"
          onChange={handleChange('email')}
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
    </Box>
  )
}

function PasswordForm() {
  /* 
    Page component for rendering the Profile Settings page's form
  */
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const [values, setValues] = React.useState({
    password: '',
    passwordMatch: '',
    showPassword: false,
    showPasswordMatch: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = () => {
    setSnackbarOpen(!snackbarOpen)
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleClickShowPasswordMatch = () => {
    setValues({
      ...values,
      showPasswordMatch: !values.showPasswordMatch,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Box sx={{
      m: 2,
      flexsDirection: 'column'
    }}>
      <Typography variant="h5" sx={{ mt: 4 }}>
        Password
      </Typography>
      <Typography variant="caption">
        Edit below to update your password on Kaizen Manager.
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingY: 2
        }}
      >
        <FormControl sx={{ m: 1, width: '50vh' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '50vh' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password (type again)</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPasswordMatch ? 'text' : 'password'}
            value={values.passwordMatch}
            onChange={handleChange('passwordMatch')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordMatch}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPasswordMatch ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Box>
      <Button variant='contained' onClick={handleSubmit}>Save</Button>
      <AlertSnackbar 
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Password updated'}
      />
    </Box>
  )
}

function DeleteAccount({openDialog}) {
  /* 
    Page component for rendering the Profile Settings' delete account button
  */

  return (
    <>
      <Box sx={{
        m: 2,
        flexsDirection: "column",
        paddingY: 2
      }}>
        <Typography variant="h5">
          Delete Account
        </Typography>
        <Typography variant="caption">
          By pressing the below button, you can delete your account after a confirmation screen.
        </Typography>
      </Box>
      <Button variant='contained' onClick={openDialog} sx={{ml: 2}} color="error">Delete Account</Button>
    </>
  )
}

function DeleteAccountDialog({ open, setOpen }) {
  /* 
    Renders the Logout Dialog
  */
  const handleClose = () => {
    setOpen(!open)
  }

  const handleDeleteAccount = () => {
    setOpen(!open)
    // Method to delete the account
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete Account"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description1">
          Are you sure you want to delete your account?
        </DialogContentText>
        <DialogContentText id="alert-dialog-description2">
          Note this action cannot be undone!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDeleteAccount} autoFocus component={Link} to={'/'} color="error">
          Delete Account
        </Button>
      </DialogActions>
    </Dialog>
  )
}
