import React from 'react'
import Button from '@mui/material/Button'
// For the dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function DeleteProjectDialog({ 
  project, delProjectOpen, setDelProjectOpen, snackbarOpen, setSnackbarOpen, 
  currentWorkspace, currentProject, currentUser, setProjects
}) {
  /* 
    Renders the Logout Dialog
  */  
  const handleClose = () => {
    setDelProjectOpen(!delProjectOpen)
  }

  const handleDeleteProject = () => {
    let delProjectFromWS = true

    const deleteProject = async () => {
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspaces/' + currentWorkspace + '/projects'
      const projectEndpoint = endpoint + '/' + currentProject
      // DELETE /users/:user_id/workspaces/:workspace_id/projects/:project_id
      await fetch( projectEndpoint, {method: 'DELETE'})
      const getProjects = await fetch( endpoint, {method: 'GET'})
      const projects = await getProjects.json()
      if (delProjectFromWS) {
        setProjects(projects)
        setDelProjectOpen(!delProjectOpen)
        setSnackbarOpen(!snackbarOpen)
      }
    }

    deleteProject()
    return () => {
      delProjectFromWS = false
    }
  }

  return (
    <>
      <Dialog
        open={delProjectOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Delete project "' + project.project_name + '"'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
    </>
  )
}
