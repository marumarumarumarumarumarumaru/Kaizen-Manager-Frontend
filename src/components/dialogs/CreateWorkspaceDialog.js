import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { validateCreateWorkspace } from '../../utils/ValidationFns'

export default function CreateWorkspaceDialog({ 
  currentUser, setCurrentWorkspace, newWorkspaceOpen, setNewWorkspaceOpen, 
  snackbarOpen, setSnackbarOpen, setWorkspaces
}) {
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
    const validationErrors = validateCreateWorkspace(workspaceName)
    const hasErrors = validationErrors.length > 0
    if (hasErrors) { 
      setErrors(validationErrors)
      console.log(errors)
      return
    }

    let createWorkspace = true

    const createWS = async () => {
      const data = { workspace_name: workspaceName }
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspaces'
      // POST /users/:user_id/workspaces
      const response = await fetch( endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const workspace = await response.json()
      const getWorkspaces = await fetch( endpoint, {method: 'GET'})
      const workspaces = await getWorkspaces.json()
      if (createWorkspace) {
        setCurrentWorkspace(workspace.workspace_id)
        setWorkspaces(workspaces)
        setNewWorkspaceOpen(!newWorkspaceOpen)
        setSnackbarOpen(!snackbarOpen)      }
    }

    createWS()
    return () => {
      createWorkspace = false
    }
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
