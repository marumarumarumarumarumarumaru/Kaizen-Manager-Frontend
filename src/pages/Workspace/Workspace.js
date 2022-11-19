import React from 'react';
import { styled } from '@mui/material/styles';

import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import ResponsiveDrawer from '../../components/ResponsiveDrawer';

import { Outlet } from 'react-router-dom';

export default function Workspace({ drawerOpen, setDrawerOpen, drawerWidth, projects, workspaces, currentWorkspace, setCurrentWorkspace, currentUser }) {
  /* 
    Page component for rendering the Workspace page
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
        {/* Outlet will display child routes */}
        <Outlet />
      </Main>
    </>
  );
}
