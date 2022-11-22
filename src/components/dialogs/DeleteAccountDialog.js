import React from 'react'
import Button from '@mui/material/Button'
// For the dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { Link } from 'react-router-dom'

export default function DeleteAccountDialog({ setLoggedIn, open, setOpen }) {
  /* 
    Renders the Logout Dialog
  */
  const handleClose = () => {
    setOpen(!open)
  }

  const handleDeleteAccount = () => {
    setOpen(!open)
    setLoggedIn(false)
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
