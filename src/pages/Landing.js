import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import GoogleButton from 'react-google-button'

import { Link } from 'react-router-dom'

export default function Landing() {
  /* 
    Page component for rendering the Landing page
  */
  const handleLogin = () => {
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
          </Box>
          <Box sx={{
            m: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
            <Link to='redirect'>
              <GoogleButton
                type='light'
                onClick={handleLogin}
              />
            </Link>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
