import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';

import GeneralSettingsForm from '../../components/forms/GeneralSettingsForm'
import ResponsiveAppBar from '../../components/appBar/ResponsiveAppBar'
import ResponsiveDrawer from '../../components/drawer/ResponsiveDrawer'

export default function GeneralSettings({ dataLoaded, drawerOpen, setDrawerOpen, drawerWidth, projects, users, workspaces, currentWorkspace, setCurrentWorkspace, currentUser, setCurrentProject }) {
  /* 
    Page component for rendering the General Settings page
  */

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  )

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }))

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
