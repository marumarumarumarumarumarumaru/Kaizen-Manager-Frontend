import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';
import { Main, DrawerHeader } from '../../components/CustomUI';

import GeneralSettingsForm from '../../components/forms/GeneralSettingsForm'
import ResponsiveAppBar from '../../components/appBar/ResponsiveAppBar'
import ResponsiveDrawer from '../../components/drawer/ResponsiveDrawer'

export default function GeneralSettings({ dataLoaded, drawerOpen, setDrawerOpen, drawerWidth, projects, users, workspaces, currentWorkspace, setCurrentWorkspace, currentUser, setCurrentProject }) {
  /* 
    Page component for rendering the General Settings page
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
            <GeneralSettingsForm/>
          </Main>
        </Box>
      : <CircularProgress />
      }
    </>
  )
}
