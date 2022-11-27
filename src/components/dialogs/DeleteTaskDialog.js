import React from 'react'
import Button from '@mui/material/Button'
// For the dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import AlertSnackbar from '../AlertSnackbar'

export default function DeleteTaskDialog({ 
  task, delTaskOpen, setDelTaskOpen, currentWorkspace, currentProject, currentUser, setProjTasks
}) {
  /* 
    Renders the Logout Dialog
  */

  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  // const [errors, setErrors] = React.useState([])

  const handleClose = () => {
    setDelTaskOpen(!delTaskOpen)
  }

  const handleDelete = () => {
    let delTaskFromWS = true

    const deleteTask = async () => {
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspaces/' + currentWorkspace + '/projects/' + currentProject + '/tasks'
      const taskEndpoint = endpoint + '/' + task.task_id
      // DELETE /users/:user_id/workspaces/:workspace_id/projects/:project_id/tasks/:task_id
      await fetch( taskEndpoint, {method: 'DELETE'})
      const getTasks = await fetch( endpoint, {method: 'GET'})
      const tasks = await getTasks.json()
      if (delTaskFromWS) {
        setProjTasks(tasks)
        setDelTaskOpen(!delTaskOpen)
        setSnackbarOpen(!snackbarOpen)
      }
    }

    deleteTask()
    return () => {
      delTaskFromWS = false
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={delTaskOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Delete "' + task.task_name + '"'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Task has been deleted'}
      />
    </React.Fragment>
  )
}
