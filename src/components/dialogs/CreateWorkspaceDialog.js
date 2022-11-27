import React from 'react'
import { Button, TextField } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

import { validateWorkspace, isEmpty } from '../../utils/ValidationFns'
import { useNavigate } from 'react-router-dom'

/**
 * Renders Dialog for create workspace
 * 
 * Parameters passed down from WorkspacesNav
 * @param {object} currentUser
 * @param {integer} currentWorkspace
 * @param {function} setCurrentWorkspace
 * @param {function} setCurrentProject
 * @param {boolean} newWorkspaceOpen
 * @param {function} setNewWorkspaceOpen
 * @param {boolean} snackbarOpen      // Boolean controls visibility
 * @param {function} setSnackbarOpen
 * @param {boolean} errorSnackbarOpen      // Boolean controls visibility
 * @param {function} setErrorSnackbarOpen
 * @param {function} setWorkspaces
 *  
 * @returns render()
 */
export default function CreateWorkspaceDialog({ 
  currentUser, setCurrentWorkspace, newWorkspaceOpen, setNewWorkspaceOpen, 
  snackbarOpen, setSnackbarOpen, errorSnackbarOpen, setErrorSnackbarOpen, setWorkspaces
}) {
  const navigate = useNavigate()
  const [workspaceName, setWorkspaceName] = React.useState('')

  const handleChange = (event) => {
    setWorkspaceName(event.target.value)
  }
  
  const handleDialogClose = () => {
    setNewWorkspaceOpen(!newWorkspaceOpen)
  }

  const handleNewWorkspaceSubmit = () => {
    const validationErrors = validateWorkspace(workspaceName)
    const hasErrors = validationErrors.length > 0
    if (hasErrors) { 
      setErrorSnackbarOpen(!errorSnackbarOpen)
      console.log(validationErrors)
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
        setSnackbarOpen(!snackbarOpen)      
        navigate('/workspaces/' + workspace.workspace_id)
      }
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
          margin='dense'
          id='name'
          label='Workspace name'
          value={workspaceName}
          error={isEmpty(workspaceName) ? true: false}
          helperText={isEmpty(workspaceName) ? 'Workspace name cannot be blank': false}
          onChange={handleChange}
          type='text'
          fullWidth
          variant='standard'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={handleNewWorkspaceSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}
