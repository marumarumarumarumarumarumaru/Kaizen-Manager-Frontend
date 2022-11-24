import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import DeleteAccountDialog from '../../components/dialogs/DeleteAccountDialog'
// import PasswordForm from '../../components/forms/ProfilePasswordForm'
import ProfileForm from '../../components/forms/ProfileForm'

export default function Profile({ setShowDrawer }) {
  /* 
    Page component for rendering the Profile Settings page
  */
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  React.useEffect(() => {
    setShowDrawer(true)
  })

  const handleDeleteAccountClickOpen = () => {
    setDeleteOpen(!deleteOpen)
  }

  return (
    <>
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
        <ProfileForm />
        <DeleteAccount openDialog={handleDeleteAccountClickOpen}/>
      </Box>
      {/* Commenting out as we currently utilize OAuth for login flow */}
      {/* <PasswordForm /> */}
      <DeleteAccountDialog open={deleteOpen} setOpen={setDeleteOpen}/>
    </>
  )
}

function DeleteAccount({openDialog}) {
  /* 
    Page component for rendering the Profile Settings' delete account button
  */

  return (
    <>
      <Box sx={{
        flexsDirection: "column",
      }}>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Delete Account
        </Typography>
        <Typography variant="caption">
          By pressing the below button, you can delete your account after a confirmation screen.
        </Typography>
      </Box>
      <Button variant='contained' onClick={openDialog} color="error" sx={{ mt: 2 }}>Delete Account</Button>
    </>
  )
}
