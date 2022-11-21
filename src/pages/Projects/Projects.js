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
    <>
      <Box sx={{
        m: 2,
        flexsDirection: 'column',
      }}>
        <Outlet />
      </Box>
    </>
  )
}
