import React from 'react'
import Button from '@mui/material/Button'
// For the dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { Link } from 'react-router-dom'

export default function DeleteAccountDialog({ 
  open, setOpen, currentUser
}) {
  /* 
    Renders the Logout Dialog
  */
  const [candidates, setCandidates] = React.useState([])

  React.useEffect(() => {
    // GET /users/:user_id/workspace-candidates-for-deletion
    let retrieveCandidates = true
  
    const fetchWorkspaces = async () => {
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspace-candidates-for-deletion'
      
      const response = await fetch(endpoint, {method: 'GET'})
      const workspaces = await response.json()
      // TODO: Loop through the workspaces -> check for workspaces with multiple user -> suggest ownership handoff
      if (retrieveCandidates) {
        setCandidates(workspaces)
      }
    }
  
    fetchWorkspaces()
    return () => {
      retrieveCandidates = false
    }
    // Disables the eslint complaining about the dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    setOpen(!open)
  }

  const handleDeleteAccount = () => {
    setOpen(!open)
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
        {candidates
        ? <DialogContentText id="alert-dialog-description3" sx={{ mt: 2 }}>
            Workspaces to be deleted:
          </DialogContentText>
        : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleDeleteAccount} 
          autoFocus 
          component={Link} to={'/'} 
          color="error"
        >
          Delete Account
        </Button>
      </DialogActions>
    </Dialog>
  )
}
