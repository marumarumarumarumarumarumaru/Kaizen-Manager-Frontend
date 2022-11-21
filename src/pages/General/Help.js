import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress';

import { Main, DrawerHeader } from '../../components/CustomUI';
import ResponsiveAppBar from '../../components/appBar/ResponsiveAppBar'
import ResponsiveDrawer from '../../components/drawer/ResponsiveDrawer'

export default function Help({ dataLoaded, drawerOpen, setDrawerOpen, drawerWidth, projects, users, workspaces, currentWorkspace, setCurrentWorkspace, currentUser, setCurrentProject }) {
  /* 
    Page component for rendering the Help page
  */
 
  return (
    <>
      {dataLoaded 
        ? <Box sx={{ display: 'flex' }}>
            <ResponsiveAppBar 
              drawerOpen={drawerOpen} 
              setDrawerOpen={setDrawerOpen} 
              drawerWidth={drawerWidth} 
              workspaces={workspaces}
              setCurrentWorkspace={setCurrentWorkspace}
              currentUser={currentUser}
            />
            <ResponsiveDrawer 
              drawerOpen={drawerOpen} 
              setDrawerOpen={setDrawerOpen} 
              drawerWidth={drawerWidth}
              projects={projects}
              users={users}
              workspaces={workspaces}
              currentWorkspace={currentWorkspace}
              setCurrentProject={setCurrentProject}
            />       
            <Main open={drawerOpen}>
              <DrawerHeader />
              <Box sx={{
                m: 2,
                flexsDirection: 'column',
                alignItems: 'left'
              }}>
                <Typography variant="h4">
                  Help
                </Typography>
                <Typography variant="caption">
                  This is a help page. It'll list some information about Kaizen Manager.
                </Typography>
              </Box>
            </Main>
          </Box>
        : <CircularProgress />
      }
    </>
  )
}
