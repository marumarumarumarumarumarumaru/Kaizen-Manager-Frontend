import React from 'react'
import { Outlet } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

import SimpleAppBar from '../components/appBar/SimpleAppBar'

export default function Base({ dataLoaded }) {  
  /* 
    Page component for rendering basic page
  */ 
  React.useEffect(() => {
  }, [])

  return (
    <>
      {dataLoaded 
      ? <>
          <SimpleAppBar />
          <Outlet />
        </> 
      : <CircularProgress />
      }
    </>
  )
}
