import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import WorkspacesNav from './WorkspacesNav';
import UserMenu from './UserMenu';
import AlertSnackbar from './AlertSnackbar';

export default function ResponsiveAppBar({ drawerOpen, setDrawerOpen, drawerWidth, workspaces, setCurrentWorkspace }) {
  /* 
    Renders the AppBar
  */
  const [snackbarCreateWSOpen, setSnackbarCreateWSOpen] = React.useState(false);

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <AppBar position="fixed" open={drawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Kaizen
          </Typography>
          {/* Shows Title in the middle (in smaller viewport) */}
          <Typography
            variant="h4"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Kaizen
          </Typography>
          <WorkspacesNav snackbarOpen={snackbarCreateWSOpen} setSnackbarOpen={setSnackbarCreateWSOpen} workspaces={workspaces} setCurrentWorkspace={setCurrentWorkspace}/>
          <UserMenu/>
        </Toolbar>
      </AppBar>
      {/* 
        This snackbar can't be placed any further down the child, 
        since it'll be hidden by the Dashbar.
      */}
      <AlertSnackbar 
        open={snackbarCreateWSOpen} 
        setOpen={setSnackbarCreateWSOpen} 
        severity={'success'}
        message={'Workspace has been created'}
      />
    </>
  );
}
