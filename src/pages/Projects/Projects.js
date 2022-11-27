import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

/**
 * Renders the projects (used for outlet)
 * 
 * @returns render()
 */
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
