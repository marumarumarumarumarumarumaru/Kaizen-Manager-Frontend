import React from 'react'
import { Box, Button, FormControl, FormHelperText, MenuItem, TextField, Select } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

import AlertSnackbar from '../AlertSnackbar'
import { isValidEmail } from '../../utils/ValidationFns'

/**
 * Renders the Dialog for adding a member
 * 
 * Parameters passed down from WorkspaceSettings
 * @param {boolean} open      // Boolean controls visibility
 * @param {fuction} setOpen 
 * @param {integer} currentWorkspace
 * @param {object} currentUser
 * @param {string} workspaceName
 * @param {function} setUsers
 * 
 * @returns render()
 */
export default function AddMemberDialog({ 
  open, setOpen, currentWorkspace, currentUser, workspaceName, setUsers
}) {
  const [values, setValues] = React.useState({
    email: '',
    role: 'member',
  })
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false)
  const roles = ['member', 'pm', 'owner']
  // const [errors, setErrors] = React.useState([])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const handleAdd = () => {
    const validationErrors = isValidEmail(values.email)
    const hasErrors = validationErrors.length > 0
    if (hasErrors) { 
      setErrorSnackbarOpen(!errorSnackbarOpen)
      console.log(validationErrors)
      return
    }
    let addMemberToWS = true
    
    const addMember = async () => {
      const url = process.env.REACT_APP_BACKEND_URL
      const emailEndpoint = url + '/users/by-email'
      const emailData = { email: values.email }
  
      // GET /users/by_email
      const userResponse = await fetch( emailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      })
      const user = await userResponse.json()
      const userId = await user.user_id
      const currUserId = currentUser.user_id
      const usersEndpoint = url + '/users/' + currUserId + '/workspaces/' + currentWorkspace + '/users'
      const putMemberEndpoint = usersEndpoint + '/' + userId
      const data = { user_role: values.role }
      // PUT /users/:user_id/workspaces/:workspace_id/users/:user_id_to_be_added
      await fetch( putMemberEndpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      // GET /users/:user_id/workspaces/:worspace_id/users
      const usersResponse = await fetch( usersEndpoint, { method: 'GET'})
      const users = await usersResponse.json() 
      if (addMemberToWS) {
        setUsers(users)
        setOpen(!open)
        setSnackbarOpen(!snackbarOpen)      
      }
    }

    addMember()
    return () => {
      addMemberToWS = false
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
        <DialogTitle id='alert-dialog-title'>
          {'Add an user to ' + workspaceName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description1'>
            Enter the email address of the user you'd like to add to this workspace.
          </DialogContentText>
          <DialogContentText id='alert-dialog-description2'>
            Note that user must have an account on Kaizen Manager.
          </DialogContentText>
          <Box sx={{ 
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
            alignItems: 'baseline', mt: 1
            }}>
            <TextField
              autoFocus
              margin='dense'
              id='email'
              label='Email'
              value={values.email}
              error={isValidEmail(values.email) ? false : true}
              helperText={isValidEmail(values.email) ? false : 'Invalid email address'}
              onChange={handleChange('email')}
              type='text'
              fullWidth
              variant='standard'
            />
            <FormControl sx={{ ml: 2, minWidth: 120 }}size='small'>
              <Select
                labelId='update-role-select-small'
                id='update-role-select-small'
                value={values.role}
                onChange={handleChange('role')}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {roles.map((role) => (
                  <MenuItem value={role}>{role.toUpperCase()}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Assign a role</FormHelperText>
            </FormControl>
          </Box>
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
      <AlertSnackbar
        open={errorSnackbarOpen} 
        setOpen={setErrorSnackbarOpen} 
        severity={'error'}
        message={'Invalid email address. Please check your input'}
      />
    </React.Fragment>
  )
}
