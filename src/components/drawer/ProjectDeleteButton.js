import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'

import { IconButton } from '@mui/material'
import DeleteProjectDialog from '../dialogs/DeleteProjectDialog'

export default function ProjectDeleteButton({ project, snackbarOpen, setSnackbarOpen }) {
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
