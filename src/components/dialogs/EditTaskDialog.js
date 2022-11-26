import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AlertSnackbar from '../AlertSnackbar'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export default function EditTaskDialog({ 
  task, users, editTaskOpen, setEditTaskOpen, currentWorkspace, currentProject, 
  currentUser, setProjTasks
}) {
  /* 
    Renders the Edit Task Dialog
  */
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [targetDate, setTargetDate] = React.useState(task.task_due_date)

  const [values, setValues] = React.useState({
    taskName: task.task_name,
    assignee: task.task_assignee,
    selectedStatus: task.task_status,
    taskValue: task.task_value,
    taskDescription: task.task_descriptions
  })

  const taskStatus = ['Backlog', 'In Progress', 'Blocked', 'In Review', 'Closed']
  // const [errors, setErrors] = React.useState([])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClose = () => {
    setEditTaskOpen(!editTaskOpen)
  }

  const handleEditTaskClose = () => {
    let updateTaskFromProj = true

    const editTask = async () => {
      const data = {
        task_name: values.taskName,
        task_value: values.taskValue,
        task_status: values.selectedStatus,
        task_assignee: values.assignee,
        task_descriptions: values.taskDescription,
        task_due_date: targetDate
      }
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
        setEditTaskOpen(!editTaskOpen)
        setSnackbarOpen(!snackbarOpen)
      }
    }

    editTask()
    return () => {
      updateTaskFromProj = false
    }
  }

  return (
    <>
      <Dialog open={editTaskOpen} onClose={handleClose}>
        <DialogTitle>Edit a task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the details below to update the task.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task name"
            value={values.taskName}
            onChange={handleChange('taskName')}
            type="text"
            fullWidth
            variant="standard"
          />
          <FormControl variant="standard" fullWidth>
            <InputLabel id="assignee-select-label">Assignee</InputLabel>
            <Select
              labelId="assignee-select-standard-label"
              id="assignee-select-standard"
              value={values.assignee || ''}
              onChange={handleChange('assignee')}
              label="Assignee"
            >
              <MenuItem value={''}>None</MenuItem>
              {users
              ? (users.map((user) => (
                  <MenuItem value={user.user_id}>{user.first_name + ' ' + user.last_name}</MenuItem>
                )))
              : null}
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-standard-label"
              id="status-select-standard"
              value={values.selectedStatus}
              onChange={handleChange('selectedStatus')}
              label="Status"
            >
              {taskStatus.map((status) => (
                <MenuItem value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task value"
            value={values.taskValue || ''}
            onChange={handleChange('taskValue')}
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Descriptions"
            value={values.taskDescription || ''}
            onChange={handleChange('taskDescription')}
            type="text"
            fullWidth
            multiline
            variant="standard"
          />
          <DatePicker
            label="Target date"
            value={targetDate}
            onChange={(newValue) => {setTargetDate(newValue)}}
            renderInput={(params) => <TextField {...params}
            sx={{ mt: 2 }}/>}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditTaskClose}>Update</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar 
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Task has been updated'}
      />
    </>
  )
}
