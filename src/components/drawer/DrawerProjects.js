import React from 'react';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AddIcon from '@mui/icons-material/Add';
import ProjectItem from './ProjectItem';

import AlertSnackbar from '../AlertSnackbar';

export default function DrawerProjects({ projects, currentWorkspace, newProjectOpen, setNewProjectOpen }) {
  /* 
    Renders the Projects in drawer
  */

  const [snackbarOpen, setSnackbarOpen] = React.useState(false) // For deletion

  const handleNewProjectClickOpen = () => {
    setNewProjectOpen(!newProjectOpen)
  };

  return (
    <>
      <List
        sx={{ width: '100%' }}
        component="nav"
        aria-labelledby="projects-subheader"
        subheader={
          <ListSubheader component="div" id="projects-subheader">
            Projects
          </ListSubheader>
        }
      >  
        {projects.map((project) => (
          <ProjectItem
            project={project}
            currentWorkspace={currentWorkspace}
            snackbarOpen={snackbarOpen}
            setSnackbarOpen={setSnackbarOpen}
          />
        ))}
        <ListItemButton sx={{ pl: 3 }} onClick={handleNewProjectClickOpen}>
          <ListItemIcon key='createProject'>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Create a project" />
        </ListItemButton>
      </List>
      <AlertSnackbar
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Project has been deleted'}
      />
    </>
  )
}
