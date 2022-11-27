import React from 'react'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

import SimpleAppBar from '../components/appBar/SimpleAppBar'
import ResponsiveAppBar from '../components/appBar/ResponsiveAppBar';
import ResponsiveDrawer from '../components/drawer/ResponsiveDrawer';
import { Main, DrawerHeader } from '../components/CustomUI';

export default function Base({ 
  workspacesLoaded, showDrawer, drawerOpen, setDrawerOpen, projects, users, 
  workspaces, currentWorkspace, setCurrentWorkspace, currentUser, currentUserRole,
  currentProject, setCurrentProject, setWorkspaces, setProjects, setLogout,
  setNavigateToRedirect
}) {  
  /* 
    Page component for rendering base templating of the page
  */ 
  React.useEffect(() => {
  }, [])

  return (
    <React.Fragment>
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
                setWorkspaces={setWorkspaces}
                setLogout={setLogout}
                setNavigateToRedirect={setNavigateToRedirect}
              />
              <ResponsiveDrawer 
                drawerOpen={drawerOpen} 
                setDrawerOpen={setDrawerOpen} 
                projects={projects}
                users={users}
                workspaces={workspaces}
                currentUser={currentUser}
                currentUserRole={currentUserRole}
                currentWorkspace={currentWorkspace}
                currentProject={currentProject}
                setCurrentProject={setCurrentProject}
                setProjects={setProjects}
                setWorkspaces={setWorkspaces}
              />
              <Main open={drawerOpen}>
                <DrawerHeader />
                {/* Outlet will display child routes */}
                <Outlet />
              </Main>        
            </Box>
          : <React.Fragment>
              <SimpleAppBar />
              <Outlet />
            </React.Fragment> 
        )
      : (showDrawer
          ? <CircularProgress />
          : <React.Fragment>
              <SimpleAppBar />
              <Outlet />
            </React.Fragment>
        )
      }
    </React.Fragment>
  )
}
