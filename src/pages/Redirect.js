import React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'

export default function Redirect({ currentWorkspace, setCurrentWorkspace, setLoggedIn }) {
  /* 
    Page component for rendering the Redirect page
  */
  React.useEffect(() => {
    // setTimeout(function() {
    //   window.location.replace('/create-workspace');
    // }, 3000);

    // setTimeout(function() {
    //   window.location.replace('/workspaces');
    // }, 3000);
  }, []);

  const handleLogIn = () => {
    setLoggedIn(true)
    // window.localStorage.setItem('loggedIn', true)
  }

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      textAlign: 'center'
      }}>
      <Box sx={{ width: '100%'}}>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Hold up, we're getting there...
        </Typography>
        <LinearProgress />
        <Link
          to={'/workspaces/' + currentWorkspace}
        >
          <Button 
            variant='contained' onClick={handleLogIn}
            sx={{ m: 2, paddingY: 1, paddingX: 2 }}>Login</Button>
        </Link>
      </Box>
    </Box>
  )
}
