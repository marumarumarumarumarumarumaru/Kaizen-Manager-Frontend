import React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

import { Typography } from '@mui/material'

export default function Redirect({ 
  setShowDrawer, currentUser, setWorkspaces, setCurrentWorkspace, setWorkspacesLoaded
}) {
  /* 
    Page component for rendering the Redirect page
  */

  React.useEffect(() => {
    setShowDrawer(false)
    setTimeout(function() {
      setWorkspacesLoaded(true)
    }, 3000)
  })
  
  React.useEffect(() => {
    let retrieveData = true
  
    const fetchData = async () => {
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspaces'
      
      const response = await fetch(endpoint, {method: 'GET'})
      const workspaces = await response.json()
      if (retrieveData) {
        setWorkspaces(workspaces) 
        if (workspaces.length > 0) {
          setCurrentWorkspace(workspaces[0].workspace_id)
        }
      }
    }
  
    fetchData()
    return () => {
      retrieveData = false
    }
    // Disables the eslint complaining about the dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      textAlign: 'center'
      }}>
      <Box sx={{ width: '100%'}}>
        <Typography variant="body2">
          Hi {currentUser.first_name}!
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Hold up, we're getting your session started...
        </Typography>
        <LinearProgress />
      </Box>
    </Box>
  )
}
