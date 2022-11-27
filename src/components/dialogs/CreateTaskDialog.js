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

export default function CreateTaskDialog ({ 
  currentWorkspace, currentProject, currentUser, selectedStatus, users, 
  newTaskOpen, setNewTaskOpen, snackbarOpen, setSnackbarOpen, setProjTasks
}) {
  /* 
    Renders the Create Project Dialog
  */
  const [targetDate, setTargetDate] = React.useState(null)

  const [values, setValues] = React.useState({
    taskName: '',
    assignee: undefined,
    selectedStatus: selectedStatus,
    taskValue: 0,
    taskDescription: ''
  })
  // const [errors, setErrors] = React.useState([])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClose = () => {
    setNewTaskOpen(!newTaskOpen)
  }

  const handleNewTaskCreate = async () => {
    let addTaskToWS = true

    const createTask = async () => {
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
      // POST /users/:user_id/workspaces/:workspace_id/projects/:project_id/tasks
      await fetch( endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const getTasks = await fetch( endpoint, {method: 'GET'})
      const tasks = await getTasks.json()
      if (addTaskToWS) {
        setProjTasks(tasks)
        setNewTaskOpen(!newTaskOpen)
        setSnackbarOpen(!snackbarOpen)
      }
    }

    createTask()
    return () => {
      addTaskToWS = false
    }
  }

  return (
    <React.Fragment>
      <Dialog open={newTaskOpen} onClose={handleClose}>
        <DialogTitle>Create new task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in below to create a new "{selectedStatus}" task. Status can be changed later.
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
          <TextField
            disabled
            margin="dense"
            id="name"
            label="Status"
            value={values.selectedStatus}
            type="text"
            fullWidth
            variant="standard"
          />
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
            label="Description"
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
          <Button onClick={handleNewTaskCreate}>Create</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar 
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Task has been created'}
      />
    </React.Fragment>
  )
}
