import React from 'react'
import Button from '@mui/material/Button'
// For the dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function DeleteWorkspaceDialog({ open, setOpen, workspaceName }) {
  /* 
    Renders the Logout Dialog
  */
  const handleClose = () => {
    setOpen(!open)
  }

  const handleDeleteWorkspace = () => {
    setOpen(!open)
    // Method to delete the workspace
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete Workspace"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the workspace "{workspaceName}"?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDeleteWorkspace}>
          Delete Workspace
        </Button>
      </DialogActions>
    </Dialog>
  )
}
