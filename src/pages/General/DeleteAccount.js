import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function DeleteAccount({openDialog}) {
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
