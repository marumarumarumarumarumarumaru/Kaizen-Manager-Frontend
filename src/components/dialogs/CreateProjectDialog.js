import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AlertSnackbar from '../AlertSnackbar'

export default function CreateProjectDialog({ currentUser, currentWorkspace, newProjectOpen, setNewProjectOpen, snackbarOpen, setSnackbarOpen }) {
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
    const data = {
      project_name: projectName
    }

    // POST /users/:user_id/workspaces/:workspace_id/projects
    fetch( process.env.REACT_APP_BACKEND_URL + '/users/' + currentUser.user_id + '/workspaces/' + currentWorkspace + '/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then ((response) => {
      console.log(response)
      if (response.ok) {
        setNewProjectOpen(!newProjectOpen)
        setSnackbarOpen(!snackbarOpen)
        return response
      } else {
        throw new Error("Something went wrong querying the database!")
      }
    })
    .catch(error => {alert(error)})

    setNewProjectOpen(!newProjectOpen)
    setSnackbarOpen(!snackbarOpen)
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