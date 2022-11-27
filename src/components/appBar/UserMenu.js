import React from 'react'

import { Avatar, Box, Divider, Menu, MenuItem, ListItemIcon, IconButton, Typography, Tooltip } from '@mui/material'
import { Logout, Help as HelpIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material'
// import Settings from '@mui/icons-material/Settings'

import { Link } from 'react-router-dom'
import LogoutDialog from '../dialogs/LogoutDialog'

/**
 * Renders the User Menu
 * 
 * Parameters passed down from ResponsiveAppBar
 * @param {object} currentUser
 * @param {function} setLogout
 * @param {function} setNavigateToRedirect
 * 
 * @returns render()
 */

export default function UserMenu({ 
  currentUser, setLogout, setNavigateToRedirect
}) {
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false)

  const handleLogoutClickOpen = () => {
    setShowLogoutDialog(true)
  }
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar>{currentUser.first_name.charAt(0)}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElUser}
          id='account-menu'
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
            <Avatar>{currentUser.first_name.charAt(0)}</Avatar>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '20', pl: 1 }}>
              <Typography>{currentUser.first_name + ' ' + currentUser.last_name}</Typography>
              <Typography variant='caption'>{currentUser.email}</Typography>
            </Box>
          </MenuItem>
          <Divider variant='middle'/>
          <MenuItem
            onClick={handleCloseUserMenu}
            component={Link}
            to={'/profile'}
          >
            <ListItemIcon>
              <AccountCircleIcon fontSize='small' />
            </ListItemIcon>
            Profile
          </MenuItem>
          {/* <MenuItem
            onClick={handleCloseUserMenu}
            component={Link}
            to={'/settings'}
          >
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            Settings
          </MenuItem> */}
          <MenuItem
            onClick={handleCloseUserMenu}
            component={Link}
            to={'/about'}
          >
            <ListItemIcon>
              <HelpIcon fontSize='small' />
            </ListItemIcon>
            About
          </MenuItem>
          <Divider variant='middle'/>
          <MenuItem
            onClick={handleLogoutClickOpen}
          >
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
      <LogoutDialog 
        open={showLogoutDialog} 
        setOpen={setShowLogoutDialog} 
        setLogout={setLogout}
        setNavigateToRedirect={setNavigateToRedirect}
      />
    </React.Fragment>
  )
}
