import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, TextField } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

import AlertSnackbar from '../AlertSnackbar'
import { validateProject, isEmpty } from '../../utils/ValidationFns'

/**
 * Renders Dialog for create project
 * 
 * Parameters passed down from ResponsiveDrawer
 * @param {object} currentUser
 * @param {integer} currentWorkspace
 * @param {function} setCurrentProject
 * @param {boolean} newProjectOpen
 * @param {function} setNewProjectOpen
 * @param {function} setProjects
 *  
 * @returns 
 */
export default function CreateProjectDialog({ 
  currentUser, currentWorkspace, setCurrentProject, newProjectOpen, setNewProjectOpen, 
  setProjects
}) {
  const navigate = useNavigate()
  const [projectName, setProjectName] = React.useState('')
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false)

  const handleChange = (event) => {
    setProjectName(event.target.value)
  }

  const handleClose = () => {
    setNewProjectOpen(!newProjectOpen)
  }

  const handleNewProjectSubmit = () => {
    const validationErrors = validateProject(projectName)
    const hasErrors = validationErrors.length > 0
    if (hasErrors) { 
      setErrorSnackbarOpen(!errorSnackbarOpen)
      console.log(validationErrors)
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
      const project = await response.json()
      const getProjects = await fetch( endpoint, {method: 'GET'})
      const projects = await getProjects.json()
      if (addProjectToWS) {
        setProjects(projects)
        setCurrentProject(project.project_id)
        setNewProjectOpen(!newProjectOpen)
        setSnackbarOpen(!snackbarOpen)
        navigate('/workspaces/' + currentWorkspace + '/projects/' + project.project_id)
      }
    }

    createProject()
    return () => {
      addProjectToWS = false
    }
  }

  return (
    <React.Fragment>
      <Dialog open={newProjectOpen} onClose={handleClose}>
        <DialogTitle>Create a project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Specify the name of the project to create a new one.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Project name'
            value={projectName}
            error={isEmpty(projectName) ? true: false}
            helperText={isEmpty(projectName) ? 'Workspace name cannot be blank': false}
            onChange={handleChange}
            type='text'
            fullWidth
            variant='standard'
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
      <AlertSnackbar
        open={errorSnackbarOpen} 
        setOpen={setErrorSnackbarOpen} 
        severity={'error'}
        message={'Project not created. Please check your input'}
      />
    </React.Fragment>
  )
}