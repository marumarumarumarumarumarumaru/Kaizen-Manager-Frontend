import React from 'react'
import { Box, Button, Paper, Typography, TextField } from '@mui/material'

import { validateWorkspace, isEmpty } from '../utils/ValidationFns'
import { useNavigate } from 'react-router-dom'
import AlertSnackbar from '../components/AlertSnackbar'

/**
 * Renders the create workspace page
 * 
 * @param {function} setShowDrawer 
 * @param {object} currentUser 
 * @param {function} setCurrentWorkspace 
 * @param {function} setWorkspaces 
 * 
 * @returns render()
 */
export default function CreateWorkspace({ 
  setShowDrawer, currentUser, setCurrentWorkspace, setWorkspaces
}) {
  /* 
    Page component for rendering the create workspace page
  */
  const navigate = useNavigate()
  const [workspaceName, setWorkspaceName] = React.useState('')
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false)

  React.useEffect(() => {
    setShowDrawer(false)
  })

  const handleChange = (event) => {
    setWorkspaceName(event.target.value)
  }

  const handleSubmit = () => {
    const validationErrors = validateWorkspace(workspaceName)
    const hasErrors = validationErrors.length > 0
    if (hasErrors) { 
      setErrorSnackbarOpen(!errorSnackbarOpen)
      console.log(validationErrors)
      return
    }

    let createWorkspace = true

    const createWS = async () => {
      const data = { workspace_name: workspaceName }
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspaces'
      // POST /users/:user_id/workspaces
      const response = await fetch( endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const workspace = await response.json()
      const getWorkspaces = await fetch( endpoint, {method: 'GET'})
      const workspaces = await getWorkspaces.json()
      if (createWorkspace) {
        setCurrentWorkspace(workspace.workspace_id)
        setWorkspaces(workspaces)
        navigate('/workspaces/' + workspace.workspace_id)
      }
    }

    createWS()
    return () => {
      createWorkspace = false
    }
  }

  return (
    <React.Fragment>
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
        }}>
        <Paper
          elevation={12}
        >
          <Box sx={{
            marginTop: 5,
            marginX: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          >
            <Typography variant='h4'>Create a Workspace</Typography>
            <Typography paragraph>Looks like your account doesn't have a workspace. Please create one before proceeding.</Typography>
          </Box>
          <Box
            component='form'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingX: 10
            }}
          >
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Workspace name'
              type='text'
              value={workspaceName}
              error={isEmpty(workspaceName) ? true: false}
              helperText={isEmpty(workspaceName) ? 'Workspace name cannot be blank': false}
              onChange={handleChange}
              fullWidth
              variant='standard'
            />
          </Box>
          <Box sx={{
            marginBottom: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
            <Button 
              variant='contained' 
              sx={{ m: 2, paddingY: 1, paddingX: 2 }}
              onClick={handleSubmit}>
                Get Started!
            </Button>
          </Box>
        </Paper>
      </Box>
      <AlertSnackbar
        open={errorSnackbarOpen} 
        setOpen={setErrorSnackbarOpen} 
        severity={'error'}
        message={'Workspace not created. Please check your input'}
      />
    </React.Fragment>
  )
}

