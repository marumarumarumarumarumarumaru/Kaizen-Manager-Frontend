import React from 'react'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Button, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

import AlertSnackbar from '../AlertSnackbar'
import { isEmpty, validateTask } from '../../utils/ValidationFns'

/**
 * Renders Dialog for create task
 * 
 * Parameters passed down from TaskCreateCard
 * @param {integer} currentWorkspace
 * @param {integer} currentProject
 * @param {object} currentUser
 * @param {string} selectedStatus
 * @param {array} users
 * @param {boolean} newTaskOpen
 * @param {function} setNewTaskOpen
 * @param {function} setProjTasks
 *  
 * @returns render()
 */
export default function CreateTaskDialog ({ 
  currentWorkspace, currentProject, currentUser, selectedStatus, users, 
  newTaskOpen, setNewTaskOpen, setProjTasks
}) {
  /* 
    Renders the Create Project Dialog
  */
  const [targetDate, setTargetDate] = React.useState(null)
  const [successSnackbarOpen, setSuccessSnackbarOpen] = React.useState(false)
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false)

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
    const validationErrors = validateTask(values)
    const hasErrors = validationErrors.length > 0
    if (hasErrors) { 
      setErrorSnackbarOpen(!errorSnackbarOpen)
      console.log(validationErrors)
      return
    }

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
        setSuccessSnackbarOpen(!successSnackbarOpen)
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
            margin='dense'
            id='name'
            label='Task name'
            value={values.taskName}
            error={isEmpty(values.taskName) ? true: false}
            helperText={isEmpty(values.taskName) ? 'Task name cannot be blank': false}
            onChange={handleChange('taskName')}
            type='text'
            fullWidth
            variant='standard'
          />
          <FormControl variant='standard' fullWidth>
            <InputLabel id='assignee-select-label'>Assignee</InputLabel>
            <Select
              labelId='assignee-select-standard-label'
              id='assignee-select-standard'
              value={values.assignee || ''}
              onChange={handleChange('assignee')}
              label='Assignee'
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
            margin='dense'
            id='name'
            label='Status'
            value={values.selectedStatus}
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Task value'
            value={values.taskValue || 0}
            onChange={handleChange('taskValue')}
            type='number'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Description'
            value={values.taskDescription || ''}
            onChange={handleChange('taskDescription')}
            type='text'
            fullWidth
            multiline
            variant='standard'
          />
          <DatePicker
            label='Target date'
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
        open={successSnackbarOpen} 
        setOpen={setSuccessSnackbarOpen} 
        severity={'success'}
        message={'Task has been created'}
      />
      <AlertSnackbar 
        open={errorSnackbarOpen} 
        setOpen={setErrorSnackbarOpen} 
        severity={'error'}
        message={'Task not created. Please check your inputs'}
      />
    </React.Fragment>
  )
}
