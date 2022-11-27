import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

/**
 * Renders Dialog to delete workspace
 * 
 * Parameters passed down from WorkspaceSettings
 * @param {boolean} open      // Boolean controls visibility
 * @param {function} setOpen
 * @param {string} workspaceName
 * @param {object} currentUser
 * @param {integer} currentWorkspace
 * @param {function} setWorkspaces
 * @param {function} setCurrentWorkspace
 *  
 * @returns render()
 */
export default function DeleteWorkspaceDialog({ 
  open, setOpen, workspaceName, currentUser, currentWorkspace, setWorkspaces, 
  setCurrentWorkspace
}) {
  /* 
    Renders the Logout Dialog
  */
  const navigate = useNavigate()
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
        } else {
          setCurrentWorkspace(null)
          navigate('/create-workspace')
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
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Delete Workspace'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
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
