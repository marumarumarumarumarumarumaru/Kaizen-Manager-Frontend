import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function WorkspacesNav() {
  /* 
    Renders the Workspaces Navigation
  */
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [newWorkspaceOpen, setNewWorkspaceOpen] = React.useState(false);

  const workspaces = ['Workspace 1', 'Testing', 'Sleepless Night']

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNewWorkspaceClickOpen = () => {
    setNewWorkspaceOpen(!newWorkspaceOpen);
  };

  const handleNewWorkspaceClose = () => {
    setNewWorkspaceOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, mr: 1 }}>
      <Tooltip title="Open workspaces">
        <Button
          key='workspaces'
          onClick={handleOpenNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Workspaces
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorElNav}
        id="account-menu"
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
        {workspaces.map((workspace) => (
          <MenuItem key={workspace} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{workspace}</Typography>
          </MenuItem>
        ))}
        <Divider variant="middle"/>
        <MenuItem>
          <ListItemIcon onClick={handleNewWorkspaceClickOpen}>
            <AddIcon fontSize='small'/>
            <Typography sx={{pl: 1}}>Create workspace</Typography>
          </ListItemIcon>
        </MenuItem>
      </Menu>
      <Dialog open={newWorkspaceOpen} onClose={handleNewWorkspaceClose}>
        <DialogTitle>Create a workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Specify the name of the workspace to create a new one.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Workspace name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewWorkspaceClose}>Cancel</Button>
          <Button onClick={handleNewWorkspaceClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default WorkspacesNav;