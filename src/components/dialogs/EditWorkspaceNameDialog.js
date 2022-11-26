import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AlertSnackbar from '../AlertSnackbar'

export default function EditWorkspaceNameDialog({ 
  workspaceName, workspaceId, open, setOpen, currentUser, setWorkspaces
}) {
  /* 
    Renders the Edit Workspace Dialog
  */
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [newName, setNewName] = React.useState(workspaceName)

  // const [errors, setErrors] = React.useState([])

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const handleEditWorkspaceUpdate = () => {
    let updateWSName = true

    const updateName = async () => {
      const data = { workspace_name: newName }
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspaces'
      const workspaceEndpoint = endpoint + '/' + workspaceId
      // PATCH /users/:user_id/workspaces/:worspace_id
      await fetch( workspaceEndpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      // GET /users/:user_id/workspaces
      const getWorkspaces = await fetch( endpoint, {method: 'GET'})
      const workspaces = await getWorkspaces.json()
      if (updateWSName) {
        setWorkspaces(workspaces)
        setOpen(!open)
        setSnackbarOpen(!snackbarOpen)
      }
    }

    updateName()
    return () => {
      updateWSName = false
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit workspace name</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description1">
            Enter the name you'd like to change the current workspace to.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="workspace-name"
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
          <Button onClick={handleEditWorkspaceUpdate} autoFocus>Update</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar 
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Workspace has been updated'}
      />
    </>
  )
}
