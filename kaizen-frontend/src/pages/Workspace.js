import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import ResponsiveAppBar from '../components/ResponsiveAppBar';
import ResponsiveDrawer from '../components/ResponsiveDrawer';

function Workspace() {
  /* 
    Page component for rendering the Main page
  */
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const drawerWidth = 260;

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
        <CssBaseline />
        <ResponsiveAppBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
        <ResponsiveDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
        <Main open={drawerOpen}>
          <DrawerHeader />
          <Typography paragraph>
            Test Page
          </Typography>
          <Typography paragraph>
            Henlo!
          </Typography>
        </Main>
      </Box>
    </>
  );
}

export default Workspace;