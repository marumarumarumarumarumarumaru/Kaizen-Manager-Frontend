import React from 'react'
import { Button } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

/**
 * Renders Dialog to delete task
 * 
 * Parameters passed down from TaskCard
 * @param {object} task
 * @param {boolean} delTaskOpen      // Boolean controls visibility
 * @param {function} setDelTaskOpen
 * @param {integer} currentWorkspace
 * @param {integer} currentProject
 * @param {object} currentUser
 * @param {function} setProjTasks
 *  
 * @returns render()
 */
export default function DeleteTaskDialog({ 
  task, delTaskOpen, setDelTaskOpen, currentWorkspace, currentProject, 
  currentUser, setProjTasks, setSnackbarOpen
}) {
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
        setSnackbarOpen(true)
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
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Delete "' + task.task_name + '"'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
