import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';

import { Outlet } from 'react-router-dom'

export default function Workspaces({ dataLoaded }) {  
  /* 
    Page component for rendering workspaces
  */ 

  return (
    <>
      {dataLoaded
      ? <Box sx={{ display: 'flex' }}>
          <Outlet/>
        </Box>
      : <CircularProgress />
      }
    </>
  )
}
