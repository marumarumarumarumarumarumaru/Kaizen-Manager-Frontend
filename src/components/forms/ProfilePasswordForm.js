import React from 'react'

import { Box, Button, Typography, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import AlertSnackbar from '../../components/AlertSnackbar'

/**
 * Renders the Profile Setting's Profile form
 * UNUSED
 *  
 * @returns render() 
 */
export default function PasswordForm() {
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
      <Typography variant='h5' sx={{ mt: 4 }}>
        Password
      </Typography>
      <Typography variant='caption'>
        Edit below to update your password on Kaizen Manager.
      </Typography>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingY: 2
        }}
      >
        <FormControl sx={{ m: 1, width: '50vh' }} variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '50vh' }} variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password'>Password (type again)</InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={values.showPasswordMatch ? 'text' : 'password'}
            value={values.passwordMatch}
            onChange={handleChange('passwordMatch')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPasswordMatch}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {values.showPasswordMatch ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
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
