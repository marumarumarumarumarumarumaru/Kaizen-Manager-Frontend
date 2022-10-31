import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import ResponsiveDrawer from '../../components/ResponsiveDrawer';

function Workspace({ drawerOpen, setDrawerOpen, drawerWidth }) {
  /* 
    Page component for rendering the Main page
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
        <ResponsiveAppBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} drawerWidth={drawerWidth} simplified={false}/>
        <ResponsiveDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} drawerWidth={drawerWidth}/>
        <Main open={drawerOpen}>
          <DrawerHeader />
          <Box sx={{
            mt: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Typography paragraph>
              Select a project to get started
            </Typography>
          </Box>
        </Main>
      </Box>
    </>
  );
}

export default Workspace;