import React from 'react'
import Button from '@mui/material/Button'
// For the dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function DeleteWorkspaceDialog({ 
  open, setOpen, workspaceName, currentUser, currentWorkspace, setWorkspaces, 
  setCurrentWorkspace
}) {
  /* 
    Renders the Logout Dialog
  */
  const handleClose = () => {
    setOpen(!open)
  }

  const handleDeleteWorkspace = () => {
    let delWorkspace = true

    const performWSDeletion = async () => {
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspaces'
      const workspaceEndpoint = endpoint + '/' + currentWorkspace
      // DELETE /users/:user_id/workspaces/:workspace_id
      await fetch( workspaceEndpoint, {method: 'DELETE'})
      const getWorkspaces = await fetch( endpoint, {method: 'GET'})
      const workspaces = await getWorkspaces.json()
      if (delWorkspace) {
        setWorkspaces(workspaces)
        if (workspaces.length > 0) {
          setCurrentWorkspace(workspaces[0].workspace_id)
        }
        setOpen(!open)
      }
    }

    performWSDeletion()
    return () => {
      delWorkspace = false
    }
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
