import React from 'react'
import Button from '@mui/material/Button'
// For the dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import AlertSnackbar from '../AlertSnackbar'
import { TextField } from '@mui/material'

export default function AddMemberDialog({ open, setOpen, currentWorkspace, workspaceName }) {
  /* 
    Renders the Remove member dialog
  */
  const [email, setEmail] = React.useState('')
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  // const [errors, setErrors] = React.useState([])

  const handleChange = (event) => {
    setEmail(event.target.value)
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const handleAdd = () => {
    setOpen(!open)
    setSnackbarOpen(!snackbarOpen)
    // Add the user to the workspace
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Add an user to ' + workspaceName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description1">
            Enter the email address of the user you'd like to add to this workspace.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description2">
            Note that user must have an account on Kaizen Manager.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            value={email}
            onChange={handleChange}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} autoFocus>Add</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'User has been added to this workspace'}
      />
    </>
  )
}
