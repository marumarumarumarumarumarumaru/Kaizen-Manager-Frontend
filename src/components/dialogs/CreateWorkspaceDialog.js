import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function CreateWorkspaceDialog({ currentUser, currentWorkspace, newWorkspaceOpen, setNewWorkspaceOpen, snackbarOpen, setSnackbarOpen }) {
  /* 
    Renders the Create Workspace Dialog
  */
  const [workspaceName, setWorkspaceName] = React.useState('')
  const [errors, setErrors] = React.useState([])

  const handleChange = (event) => {
    setWorkspaceName(event.target.value)
  }
  
  const handleDialogClose = () => {
    setNewWorkspaceOpen(!newWorkspaceOpen)
  }

  const handleNewWorkspaceSubmit = () => {
    const validationErrors = ValidateCreateWorkspace(workspaceName)
    const hasErrors = validationErrors.length > 0
    if (hasErrors) { 
      setErrors(validationErrors)
      console.log(errors)
      return
    }
    const data = {
      workspace_name: workspaceName
    }

    // POST /users/:user_id/workspaces/:workspace_id
    fetch( process.env.REACT_APP_BACKEND_URL + '/users/' + currentUser.user_id + '/workspaces/' + currentWorkspace, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then ((response) => {
      console.log(response)
      if (response.ok) {
        setNewWorkspaceOpen(!newWorkspaceOpen)
        setSnackbarOpen(!snackbarOpen)
        return response
      } else {
        throw new Error("Something went wrong querying the database!")
      }
    })
    .catch(error => {alert(error)})

    setNewWorkspaceOpen(!newWorkspaceOpen)
    setSnackbarOpen(!snackbarOpen)
  }

  return (
    <Dialog open={newWorkspaceOpen} onClose={handleDialogClose}>
      <DialogTitle>Create a workspace</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Specify the name of the workspace to create a new one.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Workspace name"
          value={workspaceName}
          onChange={handleChange}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={handleNewWorkspaceSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}

function ValidateCreateWorkspace(workspaceName) { 
  const errors = []

  if (workspaceName === null) {
    errors.push("Workspace name empty")
  }
  return errors
}