import React from 'react'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'

export default function Projects() {  
  /* 
    Page component for rendering projects
  */ 

  React.useEffect(() => {
  }, [])

  return (
    <React.Fragment>
      <Box sx={{
        m: 2,
        flexsDirection: 'column',
      }}>
        <Outlet />
      </Box>
    </React.Fragment>
  )
}
