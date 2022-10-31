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


function WorkspacesNav() {
  /* 
    Renders the WorkspacesNav
  */
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const workspaces = ['Workspace 1', 'Testing', 'Sleepless Night']

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenNavMenuSmall = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseNavMenuSmall = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
          sx={{ 
            mt: 1
          }}
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          {workspaces.map((workspace) => (
            <MenuItem key={workspace} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{workspace}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <Tooltip title="Open workspaces">
          <Button
            key='workspaces'
            onClick={handleOpenNavMenuSmall}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Workspaces
          </Button>
        </Tooltip>
        <Menu
          sx={{ 
            mt: 1
          }}
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenuSmall}
        >
          {workspaces.map((workspace) => (
            <MenuItem key={workspace} onClick={handleCloseNavMenuSmall}>
              <Typography textAlign="center">{workspace}</Typography>
            </MenuItem>
          ))}
          <Divider variant="middle"/>
          <MenuItem>
            <ListItemIcon>
              <AddIcon fontSize='small'/>
              <Typography sx={{pl: 1}}>Create workspace</Typography>
            </ListItemIcon>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export default WorkspacesNav;