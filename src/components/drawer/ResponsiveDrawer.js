import React from 'react'
import { useTheme } from '@mui/material/styles'
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
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Tooltip from '@mui/material/Tooltip'

import { Link } from 'react-router-dom'
import CreateProjectDialog from '../dialogs/CreateProjectDialog'
import DrawerProjects from './DrawerProjects'
import { DrawerHeader } from '../CustomUI'

import { Box } from '@mui/material'
import EditWorkspaceNameDialog from '../dialogs/EditWorkspaceNameDialog'
import { getWorkspaceName } from '../../utils/WorkspacesFns'

export default function ResponsiveDrawer({ 
  drawerOpen, setDrawerOpen, projects, users, workspaces, currentUser, currentUserRole,
  currentWorkspace, currentProject, setCurrentProject, setProjects, setWorkspaces
}) {
  /* 
    Renders the Drawer
  */
  const theme = useTheme()
  const [memberOpen, setMemberOpen] = React.useState(false)
  const [newProjectOpen, setNewProjectOpen] = React.useState(false)
  const [editNameOpen, setEditNameOpen] = React.useState(false)

  const drawerWidth = parseInt(process.env.REACT_APP_DRAWER_WIDTH)
  const currWorkspaceName = getWorkspaceName(workspaces, currentWorkspace)

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const handleMemberClickOpen = () => {
    setMemberOpen(!memberOpen)
  }

  const handleEditNameClickOpen = () => {
    setEditNameOpen(!editNameOpen)
  }

  return (
    <React.Fragment>
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
              <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                {currWorkspaceName}
                {currentUserRole === "owner"
                ? <Box>
                    <Tooltip title="Update name">
                      <IconButton onClick={handleEditNameClickOpen}>
                        <BorderColorIcon fontSize="small"/>
                      </IconButton>
                    </Tooltip>
                  </Box>
                : null}
              </Box>
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
              {users
              ? (users.map((user) => (
                  <ListItem key={user.id} sx={{ml: 1}}>
                    <ListItemAvatar>
                      <Avatar>{user.first_name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemButton disabled>
                      <ListItemText primary={user.first_name + ' ' + user.last_name} />
                    </ListItemButton>
                  </ListItem>
                )))
              : null}
            </List>
          </Collapse>
          <ListItemButton 
            component={Link} 
            to={'/workspaces/' + currentWorkspace + '/metrics'} 
            key='workspaceMetrics'
          >
            <ListItemText primary='Metrics' />
          </ListItemButton>
          <ListItemButton 
            component={Link} 
            to={'/workspaces/' + currentWorkspace + '/settings'} 
            key='workspaceSettings'
          >
            <ListItemText primary='Settings' />
          </ListItemButton>
        </List>
        <Divider />
        <DrawerProjects 
          projects={projects} 
          users={users}
          currentUser={currentUser}
          currentUserRole={currentUserRole}
          currentWorkspace={currentWorkspace} 
          newProjectOpen={newProjectOpen} 
          setNewProjectOpen={setNewProjectOpen} 
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
          setProjects={setProjects}
        />
      </Drawer>
      <CreateProjectDialog 
        currentUser={currentUser}
        currentWorkspace={currentWorkspace}
        setCurrentProject={setCurrentProject}
        newProjectOpen={newProjectOpen} 
        setNewProjectOpen={setNewProjectOpen} 
        setProjects={setProjects}
      />
      <EditWorkspaceNameDialog
        workspaceName={currWorkspaceName}
        workspaceId={currentWorkspace}
        open={editNameOpen}
        setOpen={setEditNameOpen}
        currentUser={currentUser}
        setWorkspaces={setWorkspaces}
      />
    </React.Fragment>
  )
}
