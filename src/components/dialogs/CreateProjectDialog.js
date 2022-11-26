import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AlertSnackbar from '../AlertSnackbar'

export default function CreateProjectDialog({ 
  currentUser, currentWorkspace, setCurrentProject, newProjectOpen, setNewProjectOpen, 
  snackbarOpen, setSnackbarOpen, setProjects
}) {
  /* 
    Renders the Create Project Dialog
  */
  const [projectName, setProjectName] = React.useState('')
  const [errors, setErrors] = React.useState([])

  const handleChange = (event) => {
    setProjectName(event.target.value)
  }

  const handleClose = () => {
    setNewProjectOpen(!newProjectOpen)
  }

  const handleNewProjectSubmit = () => {
    const validationErrors = ValidateCreateProject(projectName)
    const hasErrors = validationErrors.length > 0
    if (hasErrors) { 
      setErrors(validationErrors)
      console.log(errors)
      return
    }
    let addProjectToWS = true

    const createProject = async () => {
      const data = { project_name: projectName }
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspaces/' + currentWorkspace + '/projects'
      // POST /users/:user_id/workspaces/:workspace_id/projects
      const response = await fetch( endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const project = response.json()
      const getProjects = await fetch( endpoint, {method: 'GET'})
      const projects = await getProjects.json()
      if (addProjectToWS) {
        setProjects(projects)
        setCurrentProject(project.project_id)
        setNewProjectOpen(!newProjectOpen)
        setSnackbarOpen(!snackbarOpen)
      }
    }

    createProject()
    return () => {
      addProjectToWS = false
    }
  }

  return (
    <>
      <Dialog open={newProjectOpen} onClose={handleClose}>
        <DialogTitle>Create a project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Specify the name of the project to create a new one.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project name"
            value={projectName}
            onChange={handleChange}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleNewProjectSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar 
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Project has been created'}
      />
    </>
  )
}

function ValidateCreateProject(projectName) { 
  const errors = []

  if (projectName === null) {
    errors.push("Project name empty")
  }
  return errors
}