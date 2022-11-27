import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { WarningAmber as WarningAmberIcon } from '@mui/icons-material'

import { useLocalStorage } from '../../utils/LocalStorageFns'

/**
 * Renders Dialog for account deletion
 * 
 * Parameters passed down from Profile
 * @param {boolean} open      // Boolean controls visibility
 * @param {function} setOpen
 * @param {object} currentUser
 * @param {function} setLogout
 * @param {function} setNavigateToRedirect
 *  
 * @returns render()
 */
export default function DeleteAccountDialog({ 
  open, setOpen, currentUser, setLogout, setNavigateToRedirect
}) {
  const navigate = useNavigate()
  const [candidates, setCandidates] = useLocalStorage('candidates', null)

  React.useEffect(() => {
    let retrieveCandidates = true
  
    const fetchWorkspaces = async () => {
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspace-candidates-for-deletion'
      
      // GET /users/:user_id/workspace-candidates-for-deletion      
      const response = await fetch(endpoint, {method: 'GET'})
      const workspaces = await response.json()
      let onlyOwnerWorkspaces = []
      const workspaceEndpoint = url + '/users/' + userId + '/workspaces/'
      for (let i = 0; i < workspaces.length; i++) {
        let usersEndpoint = workspaceEndpoint + workspaces[i].workspace_id + '/users'
        // GET /users/:user_id/workspaces/:workspace_id/users
        const response = await fetch(usersEndpoint, {method: 'GET'})
        const users = await response.json()
        if (users.length > 1) {
          onlyOwnerWorkspaces.push(workspaces[i])
        }
      }
      if (retrieveCandidates) {
        setCandidates(onlyOwnerWorkspaces)
      }
    }
  
    fetchWorkspaces()
    return () => {
      retrieveCandidates = false
    }
    // Disables the eslint complaining about the dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    setOpen(!open)
  }

  const handleDeleteAccount = () => {
    let deleteUser = true
  
    const userDeletion = async () => {
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId
      
      await fetch(endpoint, {method: 'DELETE'})
      if (deleteUser) {
        setOpen(!open)
        setLogout(true)
        setNavigateToRedirect(false)
        navigate('/')
      }
    }
  
    userDeletion()
    return () => {
      deleteUser = false
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
        {'Delete Account'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description1'>
          Are you sure you want to delete your account? This action cannot be undone!
        </DialogContentText>
        {candidates
        ? (candidates.length > 0
          ? <>
              <DialogContentText id='alert-dialog-description3' sx={{ mt: 2 }} color='error'>
                Looks like you have a workspace with more than one member that you are the sole owner of.
                Please go to the following worksplace(s) and assign at least one member as owner:
              </DialogContentText>
              <List>
                {candidates.map((candidate) => (
                  <ListItem>
                    <ListItemIcon>
                      <WarningAmberIcon color='error'/>
                    </ListItemIcon>
                    <ListItemText primary={candidate.workspace_name} sx={{ color: '#f44336' }}/>
                  </ListItem>
                ))}
              </List>
            </>
          : null)
        : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleDeleteAccount} 
          autoFocus 
          component={Link} to={'/'} 
          disabled={candidates 
                    ? (candidates.length > 0)
                    : null}
          color='error'
        >
          Delete Account
        </Button>
      </DialogActions>
    </Dialog>
  )
}
