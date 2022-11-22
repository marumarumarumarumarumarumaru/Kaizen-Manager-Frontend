import React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'

export default function Redirect({currentWorkspace, setLoggedIn}) {
  /* 
    Page component for rendering the Redirect page
  */
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      });
    }, 100);
    
    return () => {
      clearInterval(timer)
    };
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
        <LinearProgress variant="determinate" value={progress} />
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
