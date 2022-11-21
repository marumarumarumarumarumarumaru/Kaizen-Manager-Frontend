import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AlertSnackbar from '../AlertSnackbar'

export default function EditProjectDialog({ projectName, projectId, open, setOpen }) {
  /* 
    Renders the Edit Project Dialog
  */
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [newName, setNewName] = React.useState(projectName)

  // const [errors, setErrors] = React.useState([])

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const handleEditProjectClose = () => {
    setOpen(!open)
    setSnackbarOpen(!snackbarOpen)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit project name</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description1">
            Enter the name you'd like to change the current project to.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="projectName"
            label="Name"
            value={newName}
            onChange={handleChange}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditProjectClose} autoFocus>Update</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar 
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Project has been updated'}
      />
    </>
  )
}
