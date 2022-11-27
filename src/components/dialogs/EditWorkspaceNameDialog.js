import React from 'react'
import { Button, TextField } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

import { isEmpty } from '../../utils/ValidationFns'
import AlertSnackbar from '../AlertSnackbar'

/**
 * Renders Dialog for edit workspace
 * 
 * Parameters passed down from ResponsiveDrawer
 * @param {string} workspaceName
 * @param {integer} workspaceId
 * @param {boolean} open      // Boolean controls visibility
 * @param {function} setOpen
 * @param {object} currentUser
 * @param {function} setWorkspaces
 *  
 * @returns render()
 */
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
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Edit workspace name</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description1'>
            Enter the name you'd like to change the current workspace to.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='workspace-name'
            label='Name'
            value={newName}
            error={isEmpty(newName) ? true: false}
            helperText={isEmpty(newName) ? 'Workspace name cannot be blank': false}
            onChange={handleChange}
            type='text'
            fullWidth
            variant='standard'
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
    </React.Fragment>
  )
}
