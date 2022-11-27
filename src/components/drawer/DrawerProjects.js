import React from 'react'
import { Link } from 'react-router-dom'

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon, ArrowRight as ArrowRightIcon } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

import AlertSnackbar from '../AlertSnackbar'
import DeleteProjectDialog from '../dialogs/DeleteProjectDialog'

/**
 * Renders the Projects in the responsive drawer
 * 
 * Parameters passed down from ResponsiveDrawer
 * @param {array} projects
 * @param {object} currentUser
 * @param {string} currentUserRole
 * @param {integer} currentWorkspace
 * @param {integer} currentProject
 * @param {boolean} newProjectOpen
 * @param {function} setNewProjectOpen
 * @param {function} setCurrentProject
 * @param {function} setProjects
 * 
 * @returns render()
 */
export default function DrawerProjects({ 
  projects, currentUser, currentUserRole, currentWorkspace, currentProject, 
  newProjectOpen, setNewProjectOpen, setCurrentProject, setProjects
}) {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false) // For deletion

  const handleNewProjectClickOpen = () => {
    setNewProjectOpen(!newProjectOpen)
  }

  return (
    <React.Fragment>
      <List
        sx={{ width: '100%' }}
        component='nav'
        aria-labelledby='projects-subheader'
        subheader={
          <ListSubheader component='div' id='projects-subheader'>
            Projects
          </ListSubheader>
        }
      >  
        {projects
        ? (projects.map((project) => (
            <ProjectItem
              project={project}
              currentUserRole={currentUserRole}
              currentWorkspace={currentWorkspace}
              snackbarOpen={snackbarOpen}
              setSnackbarOpen={setSnackbarOpen}
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
              currentUser={currentUser}
              setProjects={setProjects}/>        
          )))
        : null}
        <ListItemButton sx={{ pl: 3 }} onClick={handleNewProjectClickOpen}>
          <ListItemIcon key='createProject'>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary='Create a project' />
        </ListItemButton>
      </List>
      <AlertSnackbar
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Project has been deleted'}
      />
    </React.Fragment>
  )
}

function ProjectItem({ 
  project, currentUserRole, currentWorkspace, snackbarOpen, setSnackbarOpen, 
  currentProject, setCurrentProject, currentUser, setProjects
}) {
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
        ['owner', 'pm'].includes(currentUserRole)
        ? <ProjectDeleteButton 
            project={project}
            snackbarOpen={snackbarOpen}
            setSnackbarOpen={setSnackbarOpen}
            currentWorkspace={currentWorkspace}
            currentProject={currentProject}
            currentUser={currentUser}
            setProjects={setProjects}
          />
        : null}>
      <Link to={'/workspaces/' + currentWorkspace + '/projects/' + project.project_id} style={{ textDecoration: 'none', color: 'white' }}>
        <ListItemButton onClick={handleClick}>
          {project.project_id === currentProject 
          ? <ArrowRightIcon fontSize='large' color='primary' sx={{ mr: 0.5 }}/> 
          : null}
          <ListItemText primary={project.project_name} />
        </ListItemButton>
      </Link>
    </ListItem>
  )
}

function ProjectDeleteButton({ 
  project, snackbarOpen, setSnackbarOpen, currentWorkspace, currentProject, 
  currentUser, setProjects
}) {
  /* 
    Renders the Project Delete Button for a project under the drawer
  */
  const [delProjectOpen, setDelProjectOpen] = React.useState(false)

  const handleDelProjectClickOpen = () => {
    setDelProjectOpen(!delProjectOpen)
  }

  return (
    <React.Fragment>
      <Tooltip title='Delete project'>
        <IconButton edge='end' aria-label='project options' onClick={handleDelProjectClickOpen}>
          <DeleteIcon/>
        </IconButton>
      </Tooltip>
      <DeleteProjectDialog
        project={project}
        delProjectOpen={delProjectOpen}
        setDelProjectOpen={setDelProjectOpen}
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        currentWorkspace={currentWorkspace}
        currentUser={currentUser}
        setProjects={setProjects}
      />
    </React.Fragment>
  )
}
