import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { Link } from 'react-router-dom'

export default function Landing() {
  /* 
    Page component for rendering the Landing page
  */
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
            <Typography paragraph>Create an account or login to get started</Typography>
          </Box>
          <Box sx={{
            m: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
            <Link
              to='create-account'
            >
              <Button variant='contained' sx={{ m: 2, paddingY: 1, paddingX: 2 }}>Create an Account</Button>
            </Link>
            <Link
              to='login'
            >
              <Button variant='contained' sx={{ m: 2, paddingY: 1, paddingX: 2 }}>Login</Button>
            </Link>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
