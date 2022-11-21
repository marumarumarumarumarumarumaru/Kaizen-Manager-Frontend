import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ResponsiveAppBar from '../../components/appBar/ResponsiveAppBar';
import ResponsiveDrawer from '../../components/drawer/ResponsiveDrawer';

export default function Help({ drawerOpen, setDrawerOpen, drawerWidth, projects, workspaces, currentWorkspace, setCurrentWorkspace, currentUser }) {
  /* 
    Page component for rendering the Help page
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
  );

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  return (
    <>
      <Box sx={{ display: 'flex' }}>
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
          workspaces={workspaces}
          currentWorkspace={currentWorkspace}
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
    </>
  );
}
