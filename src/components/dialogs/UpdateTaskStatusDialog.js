import React from 'react'
import Button from '@mui/material/Button'
// For the dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import AlertSnackbar from '../AlertSnackbar'

export default function UpdateTaskStatusDialog({ 
  task, moveTaskOpen, setMoveTaskOpen, currentWorkspace, currentProject, 
  currentUser, setProjTasks
}) {
  /* 
    Renders the Edit Task Dialog
  */
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState(task.task_status)
  const taskStatus = ['Backlog', 'In Progress', 'Blocked', 'In Review', 'Closed']
  // const [errors, setErrors] = React.useState([])

  const handleChange = (event) => {
    setSelectedStatus(event.target.value)
  }

  const handleClose = () => {
    setMoveTaskOpen(!moveTaskOpen)
  }

  const handleStatusUpdate = () => {
    let updateTaskFromProj = true

    const moveTask = async () => {
      const data = { task_status: selectedStatus }
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspaces/' + currentWorkspace + '/projects/' + currentProject + '/tasks'
      const taskEndpoint = endpoint + '/' + task.task_id
      // PATCH /users/:user_id/workspaces/:workspace_id/projects/:project_id/tasks/:task_id
      await fetch( taskEndpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const getTasks = await fetch( endpoint, {method: 'GET'})
      const tasks = await getTasks.json()
      if (updateTaskFromProj) {
        setProjTasks(tasks)
        setMoveTaskOpen(!moveTaskOpen)
        setSnackbarOpen(!snackbarOpen)
      }
    }

    moveTask()
    return () => {
      updateTaskFromProj = false
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={moveTaskOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Move "' + task.name + '" to a different state'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Select the state you'd like to apply for this task
          </DialogContentText>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="update-status-select-label">Status</InputLabel>
            <Select
              labelId="update-status-select-standard-label"
              id="update-status-select-standard"
              value={selectedStatus}
              onChange={handleChange}
              label="Status"
            >
              {taskStatus.map((status) => (
                <MenuItem value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleStatusUpdate} autoFocus>Update</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar 
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Task has been moved to "' + selectedStatus + '"'}
      />
    </React.Fragment>
  )
}
