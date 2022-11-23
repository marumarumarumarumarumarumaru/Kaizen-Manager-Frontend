import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'

export default function Landing({ setShouldRedirect, currentUser, setCurrentUser }) {
  /* 
    Page component for rendering the Landing page
  */
  const handleLogin = (jwtToken) => {
    const firstName = jwtToken.given_name
    const lastName = jwtToken.family_name
    const email = jwtToken.email

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email
    }

    fetch( process.env.REACT_APP_BACKEND_URL + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
        .then((data) => {
          setCurrentUser(data)
          console.log(currentUser)
          setShouldRedirect(true)
        })
        .catch(error => {alert(error);})   
  }

  return (
    <>
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
        }}>
        <Paper
          elevation={12}
        >
          <Box sx={{
            m: 5,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          >
            <Typography variant='h4'>Welcome to Kaizen Manager</Typography>
            <Typography paragraph>Click on the button below to get started!</Typography>
            <GoogleLogin
              onSuccess={credentialResponse => {
                let jwtToken = jwtDecode(credentialResponse.credential)
                handleLogin(jwtToken)
              }}                
              onError={() => {
                console.log('Login Failed')
              }}
            />
          </Box>
        </Paper>
      </Box>
    </>
  )
}
