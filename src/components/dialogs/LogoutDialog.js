import React from 'react'
import { Button } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

import { useNavigate } from 'react-router-dom'

/**
 * Renders Dialog for logout
 * 
 * Parameters passed down from UserNav
 * @param {boolean} open      // Boolean controls visibility
 * @param {function} setOpen
 * @param {function} setLogout
 * @param {function} setNavigateToRedirect
 *  
 * @returns 
 */
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
