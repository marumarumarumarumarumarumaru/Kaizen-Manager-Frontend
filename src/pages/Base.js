import React from 'react'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

import SimpleAppBar from '../components/appBar/SimpleAppBar'
import ResponsiveAppBar from '../components/appBar/ResponsiveAppBar';
import ResponsiveDrawer from '../components/drawer/ResponsiveDrawer';
import { Main, DrawerHeader } from '../components/CustomUI';

export default function Base({ workspacesLoaded, showDrawer, drawerOpen, setDrawerOpen, projects, users, workspaces, currentWorkspace, setCurrentWorkspace, currentUser, setCurrentProject }) {  
  /* 
    Page component for rendering base templating of the page
  */ 
  React.useEffect(() => {
  }, [])

  return (
    <>
      {workspacesLoaded 
      ? (showDrawer
          ? <Box sx={{ display: 'flex' }}>
              <ResponsiveAppBar 
                drawerOpen={drawerOpen} 
                setDrawerOpen={setDrawerOpen} 
                workspaces={workspaces}
                currentWorkspace={currentWorkspace}
                setCurrentWorkspace={setCurrentWorkspace}
                currentUser={currentUser}
              />
              <ResponsiveDrawer 
                drawerOpen={drawerOpen} 
                setDrawerOpen={setDrawerOpen} 
                projects={projects}
                users={users}
                workspaces={workspaces}
                currentUser={currentUser}
                currentWorkspace={currentWorkspace}
                setCurrentProject={setCurrentProject}
              />
              <Main open={drawerOpen}>
                <DrawerHeader />
                {/* Outlet will display child routes */}
                <Outlet />
              </Main>        
            </Box>
          : <>
              <SimpleAppBar />
              <Outlet />
            </> 
        )
      : (showDrawer
          ? <CircularProgress />
          : <>
              <SimpleAppBar />
              <Outlet />
            </>
        )
      }
    </>
  )
}
