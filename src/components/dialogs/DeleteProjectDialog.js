import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

/**
 * Renders Dialog to delete project
 * 
 * Parameters passed down from DrawerProjects
 * @param {object} project
 * @param {boolean} delProjectOpen      // Boolean controls visibility
 * @param {function} setDelProjectOpen
 * @param {boolean} snackbarOpen      // Boolean controls visibility
 * @param {function} setSnackbarOpen
 * @param {integer} currentWorkspace
 * @param {object} currentUser
 * @param {function} setProjects
 *  
 * @returns 
 */
export default function DeleteProjectDialog({ 
  project, delProjectOpen, setDelProjectOpen, snackbarOpen, setSnackbarOpen, 
  currentWorkspace, currentUser, setProjects
}) {
  /* 
    Renders the Logout Dialog
  */  
  const navigate = useNavigate()
  const handleClose = () => {
    setDelProjectOpen(!delProjectOpen)
  }

  const handleDeleteProject = () => {
    let delProjectFromWS = true

    const deleteProject = async () => {
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspaces/' + currentWorkspace + '/projects'
      const projectEndpoint = endpoint + '/' + project.project_id
      // DELETE /users/:user_id/workspaces/:workspace_id/projects/:project_id
      await fetch( projectEndpoint, {method: 'DELETE'})
      const getProjects = await fetch( endpoint, {method: 'GET'})
      const projects = await getProjects.json()
      if (delProjectFromWS) {
        setProjects(projects)
        setDelProjectOpen(!delProjectOpen)
        setSnackbarOpen(!snackbarOpen)
        navigate('/workspaces/' + currentWorkspace)
      }
    }

    deleteProject()
    return () => {
      delProjectFromWS = false
    }
  }

  return (
    <Dialog
      open={delProjectOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Delete project "' + project.project_name + '"'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete this project?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDeleteProject}>
          Delete Project
        </Button>
      </DialogActions>
    </Dialog>
)
}
