import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'

import SimpleAppBar from '../components/appBar/SimpleAppBar'
import ResponsiveAppBar from '../components/appBar/ResponsiveAppBar'
import ResponsiveDrawer from '../components/drawer/ResponsiveDrawer'
import { Main, DrawerHeader } from '../components/CustomUI'

/**
 * Renders the Base page (for rendering/controlling visibility of drawer and appbar)
 * 
 * @param {boolean} workspacesLoaded
 * @param {function} setShowDrawer 
 * @param {boolean} drawerOpen
 * @param {fnction} setDrawerOpen
 * @param {array} projects
 * @param {array} users 
 * @param {array} workspaces 
 * @param {integer} currentWorkspace 
 * @param {function} setCurrentWorkspace 
 * @param {object} currentUser 
 * @param {function} setCurrentUser 
 * @param {string} currentUserRole
 * @param {integer} currentProject 
 * @param {function} setCurrentProject 
 * @param {function} setWorkspaces 
 * @param {function} setProjects 
 * @param {function} setLogout 
 * @param {function} setNavigateToRedirect 
 * 
 * @returns render()
 */
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
