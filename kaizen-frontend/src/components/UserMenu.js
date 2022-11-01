import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';

function UserMenu() {
  /* 
    Renders the UserMenu
  */
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [logout, setLogout] = React.useState(false);

  const handleLogoutClickOpen = () => {
    setLogout(true);
  };

  const handleLogoutClose = () => {
    setLogout(false);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar>F</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElUser}
          id="account-menu"
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          onClick={handleCloseUserMenu}
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
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            disabled
          >
            <Avatar>F</Avatar>
            <Box sx={{display: 'flex', flexDirection: 'column', width:'20vh', pl: 1 }}>
              <Typography>Test Name</Typography>
              <Typography variant="caption">testemail@oregonstate.edu</Typography>
            </Box>
          </MenuItem>
          <Divider variant="middle"/>
          <MenuItem
            onClick={handleCloseUserMenu}
          >
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem
            onClick={handleCloseUserMenu}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem
            onClick={handleCloseUserMenu}
          >
            <ListItemIcon>
              <HelpIcon fontSize="small" />
            </ListItemIcon>
            Help
          </MenuItem>
          <Divider variant="middle"/>
          <MenuItem
            onClick={handleLogoutClickOpen}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
      <Dialog
        open={logout}
        onClose={handleLogoutClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Logout of Kaizen"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutClose}>Cancel</Button>
          <Button onClick={handleLogoutClose} autoFocus component={Link} to={'/'}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserMenu;