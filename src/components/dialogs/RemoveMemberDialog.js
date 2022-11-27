import React from 'react'
import { Button } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

import AlertSnackbar from '../AlertSnackbar'

/**
 * Renders Dialog for member removal
 * 
 * Parameters passed down from WSMembersTable
 * @param {object} user
 * @param {object} currentUser
 * @param {integer} currentWorkspace
 * @param {function} setUsers
 * @param {boolean} removeUserOpen      // Boolean controls visibility
 * @param {function} setRemoveUserOpen
 *  
 * @returns render()
 */
export default function RemoveMemberDialog({ 
  user, currentUser, currentWorkspace, setUsers, removeUserOpen, setRemoveUserOpen 
}) {
  const fullName = user.first_name + ' ' + user.last_name
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const handleClose = () => {
    setRemoveUserOpen(!removeUserOpen)
  }

  const handleRemove = () => {
    let removeMemberFromWS = true

    const removeMember = async () => {
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = user.user_id
      const currUserId = currentUser.user_id
      const usersEndpoint = url + '/users/' + currUserId + '/workspaces/' + currentWorkspace + '/users'
      const deleteMemberEndpoint = usersEndpoint + '/' + userId
      // DELETE /users/:user_id/workspaces/:workspace_id/users/:user_id_to_be_deleted
      await fetch( deleteMemberEndpoint, {method: 'DELETE'})
      // GET /users/:user_id/workspaces/:worspace_id/users
      const usersResponse = await fetch( usersEndpoint, { method: 'GET'})
      const users = await usersResponse.json() 
      if (removeMemberFromWS) {
        setUsers(users)
        setRemoveUserOpen(!removeUserOpen)
        setSnackbarOpen(!snackbarOpen) 
      }
    }

    removeMember()
    return () => {
      removeMemberFromWS = false
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={removeUserOpen}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Remove ' + fullName + ' from current workspace'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to remove {fullName} from this workspace?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRemove} autoFocus>Remove</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={fullName + ' has been removed from this workspace'}
      />
    </React.Fragment>
  )
}
