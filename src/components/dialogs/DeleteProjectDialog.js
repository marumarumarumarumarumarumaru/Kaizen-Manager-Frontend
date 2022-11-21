import React from 'react'
import Button from '@mui/material/Button'
// For the dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function DeleteProjectDialog({ project, delProjectOpen, setDelProjectOpen, snackbarOpen, setSnackbarOpen }) {
  /* 
    Renders the Logout Dialog
  */  
  const handleClose = () => {
    setDelProjectOpen(!delProjectOpen)
  }

  const handleDeleteProject = () => {
    setDelProjectOpen(!delProjectOpen)
    setSnackbarOpen(!snackbarOpen)
    // Method to delete the workspace
  }

  return (
    <>
      <Dialog
        open={delProjectOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Delete project "' + project.project_name + '"'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteProject}>
            Delete Project
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
