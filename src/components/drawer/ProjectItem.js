import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { Link } from 'react-router-dom'
import ProjectDeleteButton from './ProjectDeleteButton'

export default function ProjectItem({ project, currentWorkspace, snackbarOpen, setSnackbarOpen, setCurrentProject }) {
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
