import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress';

import ResponsiveAppBar from '../../components/appBar/ResponsiveAppBar'
import ResponsiveDrawer from '../../components/drawer/ResponsiveDrawer'
import ProfileForm from '../../components/forms/ProfileForm'
import DeleteAccount from './DeleteAccount'
import DeleteAccountDialog from '../../components/dialogs/DeleteAccountDialog'
import PasswordForm from '../../components/forms/ProfilePasswordForm'

export default function Profile({ dataLoaded, drawerOpen, setDrawerOpen, drawerWidth, projects, users, workspaces, currentWorkspace, setCurrentWorkspace, currentUser, setCurrentProject }) {
  /* 
    Page component for rendering the Profile Settings page
  */
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  const handleDeleteAccountClickOpen = () => {
    setDeleteOpen(!deleteOpen)
  }
    
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
              <Box sx={{
                m: 2,
                flexsDirection: 'column',
              }}>
                <Typography variant="h4">
                  Profile Settings
                </Typography>
                <Typography variant="caption">
                  Edit below to update your user profile on Kaizen Manager.
                </Typography>
              </Box>
              <ProfileForm />
              <PasswordForm />
              <DeleteAccount openDialog={handleDeleteAccountClickOpen}/>
            </Main>
            <DeleteAccountDialog open={deleteOpen} setOpen={setDeleteOpen}/>
          </Box>
        : <CircularProgress />
      }
    </>
  )
}
