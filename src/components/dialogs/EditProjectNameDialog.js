import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AlertSnackbar from '../AlertSnackbar'

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
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit project name</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description1">
            Enter the name you'd like to change the current project to.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="project-name"
            label="Name"
            value={newName}
            onChange={handleChange}
            type="text"
            fullWidth
            variant="standard"
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
    </>
  )
}
