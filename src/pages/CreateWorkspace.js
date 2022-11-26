import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'

import { validateCreateWorkspace } from '../utils/ValidationFns'

export default function CreateWorkspace({ 
  setShowDrawer, currentWorkspace, currentUser, setCurrentWorkspace, setWorkspaces
}) {
  /* 
    Page component for rendering the create workspace page
  */
  const [workspaceName, setWorkspaceName] = React.useState('')
  const [errors, setErrors] = React.useState([])

  React.useEffect(() => {
    setShowDrawer(false)
  })

  const handleChange = (event) => {
    setWorkspaceName(event.target.value)
  }

  const handleSubmit = () => {
    const validationErrors = validateCreateWorkspace(workspaceName)
    const hasErrors = validationErrors.length > 0
    if (hasErrors) { 
      setErrors(validationErrors)
      console.log(errors)
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
      }
    }

    createWS()
    return () => {
      createWorkspace = false
    }
  }

  return (
    <>
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
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingX: 10
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Workspace name"
              type="text"
              value={workspaceName}
              onChange={handleChange}
              fullWidth
              variant="standard"
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
            <Link
              to={'/workspaces/' + currentWorkspace}
            >
              <Button 
                variant='contained' 
                sx={{ m: 2, paddingY: 1, paddingX: 2 }}
                onClick={handleSubmit}>
                  Get Started!
              </Button>
            </Link>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

