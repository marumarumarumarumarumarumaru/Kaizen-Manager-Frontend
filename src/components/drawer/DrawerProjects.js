import React from 'react'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import AddIcon from '@mui/icons-material/Add'
import ListItem from '@mui/material/ListItem'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'

import AlertSnackbar from '../AlertSnackbar'
import DeleteProjectDialog from '../dialogs/DeleteProjectDialog'

export default function DrawerProjects({ projects, currentWorkspace, newProjectOpen, setNewProjectOpen, setCurrentProject }) {
  /* 
    Renders the Projects in drawer
  */

  const [snackbarOpen, setSnackbarOpen] = React.useState(false) // For deletion

  const handleNewProjectClickOpen = () => {
    setNewProjectOpen(!newProjectOpen)
  }

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
            setCurrentProject={setCurrentProject}/>        
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

function ProjectItem({ project, currentWorkspace, snackbarOpen, setSnackbarOpen, setCurrentProject }) {
  /* 
    Renders the Project Item under drawer project list
  */
  const handleClick = () => {
    setCurrentProject(project.project_id)
  }

  return (
    <ListItem 
      key={project.project_id} 
      disablePadding 
      secondaryAction={
        <ProjectDeleteButton 
          project={project}
          snackbarOpen={snackbarOpen}
          setSnackbarOpen={setSnackbarOpen}/>
      }>
      <Link to={'/workspaces/' + currentWorkspace + '/projects/' + project.project_id} style={{ textDecoration: 'none', color: 'white' }}>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={project.project_name} />
        </ListItemButton>
      </Link>
    </ListItem>
  )
}

function ProjectDeleteButton({ project, snackbarOpen, setSnackbarOpen }) {
  /* 
    Renders the Project Delete Button for a project under the drawer
  */
  const [delProjectOpen, setDelProjectOpen] = React.useState(false)

  const handleDelProjectClickOpen = () => {
    setDelProjectOpen(!delProjectOpen)
  }

  return (
    <>
      <Tooltip title="Delete project">
        <IconButton edge="end" aria-label="project options" onClick={handleDelProjectClickOpen}>
          <DeleteIcon/>
        </IconButton>
      </Tooltip>
      <DeleteProjectDialog
        project={project}
        delProjectOpen={delProjectOpen}
        setDelProjectOpen={setDelProjectOpen}
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    </>
  )
}
