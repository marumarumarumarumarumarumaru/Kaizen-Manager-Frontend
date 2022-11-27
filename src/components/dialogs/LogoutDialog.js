import React from 'react'
import Button from '@mui/material/Button'
// For the dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useNavigate } from 'react-router-dom'

export default function LogoutDialog({ 
  open, setOpen, setLogout, setNavigateToRedirect
}) {
  /* 
    Renders the Logout Dialog
  */
  const navigate = useNavigate()
  const handleClose = () => {
    setOpen(!open)
  }

  const handleLogout = () => {
    setOpen(!open)
    setLogout(true)
    setNavigateToRedirect(false)
    navigate('/')
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Logout of Kaizen'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleLogout} autoFocus>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  )
}
