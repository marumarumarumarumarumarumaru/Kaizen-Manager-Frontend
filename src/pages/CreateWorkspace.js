import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'

export default function CreateWorkspace() {
  /* 
    Page component for rendering the Login page
  */

  const [workspaceName, setWorkspaceName] = React.useState('')

  const handleChange = (event) => {
    setWorkspaceName(event.target.value)
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
              required
              id="outlined-required"
              label="Workspace"
              type="text"
              value={workspaceName}
              onChange={handleChange}
              sx={{ m: 1, width: '30vh' }}
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
              <Button variant='contained' sx={{ m: 2, paddingY: 1, paddingX: 2 }}>Get Started!</Button>
            </Link>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
