import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AddIcon from '@mui/icons-material/Add'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import { Link } from 'react-router-dom'
import CreateWorkspaceDialog from '../dialogs/CreateWorkspaceDialog'

export default function WorkspacesNav({
  currentUser, currentWorkspace, setCurrentWorkspace, snackbarOpen, setSnackbarOpen, 
  errorSnackbarOpen, setErrorSnackbarOpen, workspaces, setWorkspaces
}) {
  /* 
    Renders the Workspaces Navigation
  */
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [newWorkspaceOpen, setNewWorkspaceOpen] = React.useState(false)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleWorkspaceSelect = (workspace) => {
    setCurrentWorkspace(workspace.workspace_id)
  }

  const handleNewWorkspaceClickOpen = () => {
    setNewWorkspaceOpen(!newWorkspaceOpen)
  }

  return (
    <Box sx={{ flexGrow: 1, mr: 1 }}>
      <Tooltip title='Open workspaces'>
        <Button
          key='workspaces'
          onClick={handleOpenNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant='overline'>Workspaces</Typography> 
            <ExpandMoreIcon/>
          </Box>
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorElNav}
        id='account-menu'
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        onClick={handleCloseNavMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            }
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        {workspaces
        ? (workspaces.map((workspace) => (
            <Link to={'/workspaces/' + workspace.workspace_id} style={{ textDecoration: 'none', color: 'white' }}>
              <MenuItem 
                key={workspace.workspace_id} 
                onClick={(event) => handleWorkspaceSelect(workspace)}
                >
                  {workspace.workspace_id === currentWorkspace 
                  ? <ArrowRightIcon fontSize='large' color='primary' sx={{ mr: 0.5 }}/> 
                  : null}
                  <Typography textAlign='center'>{workspace.workspace_name}</Typography>
              </MenuItem>
            </Link>
          )))
          // We shouldn't encounter a case where no workspace exist for user, BUT in the case it does happen to avoid error
        : <></>}
        <Divider variant='middle'/>
        <MenuItem>
          <ListItemIcon key='create' onClick={handleNewWorkspaceClickOpen}>
            <AddIcon fontSize='small'/>
            <Typography sx={{pl: 1}}>Create workspace</Typography>
          </ListItemIcon>
        </MenuItem>
      </Menu>
      <CreateWorkspaceDialog 
        currentUser={currentUser} 
        setCurrentWorkspace={setCurrentWorkspace}
        newWorkspaceOpen={newWorkspaceOpen} 
        setNewWorkspaceOpen={setNewWorkspaceOpen} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen}
        errorSnackbarOpen={errorSnackbarOpen}
        setErrorSnackbarOpen={setErrorSnackbarOpen}
        setWorkspaces={setWorkspaces}/>
    </Box>
  )
}
