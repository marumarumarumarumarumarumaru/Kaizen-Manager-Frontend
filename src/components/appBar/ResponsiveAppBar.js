import React from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'

import WorkspacesNav from './WorkspacesNav'
import UserMenu from './UserMenu'
import AlertSnackbar from '../AlertSnackbar'
import { AppBar } from '../CustomUI'

export default function ResponsiveAppBar({ 
  drawerOpen, setDrawerOpen, workspaces, currentWorkspace, setCurrentWorkspace, 
  currentUser, setWorkspaces, setLogout, setNavigateToRedirect
}) {
  /* 
    Renders the AppBar
  */
  const [snackbarCreateWSOpen, setSnackbarCreateWSOpen] = React.useState(false)
  const [snackbarErrorWSOpen, setSnackbarErrorWSOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  return (
    <React.Fragment>
      <AppBar position="fixed" open={drawerOpen}>
        <Toolbar>
          <Tooltip title="Expand drawer">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href={"/workspaces/" + currentWorkspace}
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
            href={"/workspaces/" + currentWorkspace}
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
          <WorkspacesNav 
            currentUser={currentUser} 
            currentWorkspace={currentWorkspace}
            setCurrentWorkspace={setCurrentWorkspace}
            snackbarOpen={snackbarCreateWSOpen} 
            setSnackbarOpen={setSnackbarCreateWSOpen} 
            errorSnackbarOpen={snackbarErrorWSOpen}
            setErrorSnackbarOpen={setSnackbarErrorWSOpen}
            workspaces={workspaces}
            setWorkspaces={setWorkspaces}/>
          <UserMenu 
            currentUser={currentUser} 
            setLogout={setLogout}
            setNavigateToRedirect={setNavigateToRedirect}
          />
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
      <AlertSnackbar 
        open={snackbarErrorWSOpen} 
        setOpen={setSnackbarErrorWSOpen} 
        severity={'error'}
        message={'Workspace not created. Please check your input'}
      />
    </React.Fragment>
  )
}
