import React from 'react'
import { Button, TextField } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

import AlertSnackbar from '../AlertSnackbar'
import { isEmpty } from '../../utils/ValidationFns'

/**
 * Renders Dialog for edit project name
 * 
 * Parameters passed down from Project
 * @param {string} projectName
 * @param {integer} projectId
 * @param {boolean} open      // Boolean controls visibility
 * @param {function} setOpen
 * @param {object} currentUser
 * @param {integer} currentWorkspace
 * @param {function} setProjects
 *  
 * @returns 
 */
export default function EditProjectNameDialog({ 
  projectName, projectId, open, setOpen, currentUser, currentWorkspace, setProjects
}) {
  /* 
    Renders the Edit Project Dialog
  */
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [newName, setNewName] = React.useState(projectName)

  // const [errors, setErrors] = React.useState([])

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const handleEditProjectUpdate = () => {
    let updateProjectName = true

    const updateName = async () => {
      const data = { project_name: newName }
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspaces/' + currentWorkspace + '/projects'
      const projectEndpoint = endpoint + '/' + projectId
      // PATCH /users/:user_id/workspaces/:worspace_id/projects/:project_id
      await fetch( projectEndpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      // GET /users/:user_id/workspaces/:worspace_id/projects
      const getProjects = await fetch( endpoint, {method: 'GET'})
      const projects = await getProjects.json()
      if (updateProjectName) {
        setProjects(projects)
        setOpen(!open)
        setSnackbarOpen(!snackbarOpen)
      }
    }

    updateName()
    return () => {
      updateProjectName = false
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
        <DialogTitle id='alert-dialog-title'>Edit project name</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description1'>
            Enter the name you'd like to change the current project to.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='project-name'
            label='Name'
            value={newName}
            error={isEmpty(newName) ? true: false}
            helperText={isEmpty(newName) ? 'Project name cannot be blank': false}
            onChange={handleChange}
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditProjectUpdate} autoFocus>Update</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar 
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Project has been updated'}
      />
    </React.Fragment>
  )
}
