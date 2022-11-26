import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { GoogleLogin } from '@react-oauth/google'

export default function Landing({ setShowDrawer, setNavigateToRedirect, currentUser, setCurrentUser }) {
  /* 
    Page component for rendering the Landing page
  */
  React.useEffect(() => {
    setShowDrawer(false)
  })

  const handleLogin = (credentialResponse) => {
    const credential = credentialResponse.credential

    const data = {
      credential: credential
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
          setNavigateToRedirect(true)
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
                handleLogin(credentialResponse)
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
