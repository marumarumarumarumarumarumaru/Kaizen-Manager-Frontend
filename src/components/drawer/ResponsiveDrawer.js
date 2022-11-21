import React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

import { Link } from 'react-router-dom'
import CreateProjectDialog from '../dialogs/CreateProjectDialog'
import DrawerProjects from './DrawerProjects'
import Tooltip from '@mui/material/Tooltip'

export default function ResponsiveDrawer({ drawerOpen, setDrawerOpen, drawerWidth, projects, workspaces, currentWorkspace, setCurrentProject }) {
  /* 
    Renders the Drawer
  */
  const theme = useTheme()
  const [memberOpen, setMemberOpen] = React.useState(false)
  const [newProjectOpen, setNewProjectOpen] = React.useState(false)
  const [snackbarCreateProjectOpen, setSnackbarCreateProjectOpen] = React.useState(false)

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const handleMemberClickOpen = () => {
    setMemberOpen(!memberOpen)
  }

  const getWorkspaceName = (workspaces, currentWorkspace) => {
    let workspaceName = ''

    for (let i = 0 ; i < workspaces.length ; i++) {
      if (workspaces[i].workspace_id === currentWorkspace) {
        workspaceName = workspaces[i].workspace_name
      }
    } 
    return workspaceName
  }

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          }
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader>
          <Tooltip title="Hide drawer">
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </DrawerHeader>
        <Divider />
        <List
          sx={{ width: '100%' }}
          component="nav"
          aria-labelledby="workspace-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              {getWorkspaceName(workspaces, currentWorkspace)}
            </ListSubheader>
          }
        >            
          <Tooltip title="View members">
            <ListItemButton key='membersButton' onClick={handleMemberClickOpen}>
              <ListItemText primary='Members' />
              {memberOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </Tooltip>
          <Collapse in={memberOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {['John Doe', 'Fusako Obata', 'Marcos Castillo', 'Corey Gallahar'].map((text, index) => (
                <ListItem key={text} sx={{ml: 1}}>
                  <ListItemAvatar>
                    <Avatar>{text.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemButton disabled>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItemButton component={Link} to={'/workspaces/' + currentWorkspace + '/metrics'} key='workspaceMetrics'>
            <ListItemText primary='Metrics' />
          </ListItemButton>
          <ListItemButton component={Link} to={'/workspaces/' + currentWorkspace + '/settings'} key='workspaceSettings'>
            <ListItemText primary='Settings' />
          </ListItemButton>
        </List>
        <Divider />
        <DrawerProjects 
          projects={projects} 
          currentWorkspace={currentWorkspace} 
          newProjectOpen={newProjectOpen} 
          setNewProjectOpen={setNewProjectOpen} 
          setCurrentProject={setCurrentProject}/>
      </Drawer>
      <CreateProjectDialog 
        newProjectOpen={newProjectOpen} 
        setNewProjectOpen={setNewProjectOpen} 
        snackbarOpen={snackbarCreateProjectOpen}
        setSnackbarOpen={setSnackbarCreateProjectOpen}/>
    </>
  )
}
