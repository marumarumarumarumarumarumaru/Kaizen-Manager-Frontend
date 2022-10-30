import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';

function ResponsiveDrawer({ drawerOpen, setDrawerOpen }) {
  /* 
    Renders the Drawer
  */
  const theme = useTheme();
  const [memberOpen, setMemberOpen] = React.useState(false);

  const drawerWidth = 260;

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleMemberClick = () => {
    setMemberOpen(!memberOpen);
  };

  return (
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
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List
        sx={{ width: '100%' }}
        component="nav"
        aria-labelledby="workspace-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Workspace Name
          </ListSubheader>
        }
      >            
        <ListItemButton onClick={handleMemberClick}>
          <ListItemText primary='Members' />
          {memberOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={memberOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {['John Doe', 'Fusako Obata', 'Marcos Castillo', 'Corey Gallahar'].map((text, index) => (
              <ListItem key={text}>
                <ListItemAvatar>
                  <Avatar>{text.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add a member" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton>
          <ListItemText primary='Settings' />
        </ListItemButton>
      </List>
      <Divider />
      <List
        sx={{ width: '100%' }}
        component="nav"
        aria-labelledby="views-subheader"
        subheader={
          <ListSubheader component="div" id="views-subheader">
            Views
          </ListSubheader>
        }
      >  
        <ListItemButton>
          <ListItemText primary='Metrics' />
        </ListItemButton>
      </List>
      <Divider />
      <List
        sx={{ width: '100%' }}
        component="nav"
        aria-labelledby="projects-subheader"
        subheader={
          <ListSubheader component="div" id="projects-subheader">
            Views
          </ListSubheader>
        }
      >  
        {['Test project', 'CS467', 'CS493'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default ResponsiveDrawer;