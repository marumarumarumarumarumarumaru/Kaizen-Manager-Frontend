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
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function EditTaskDialog({ task, users, editTaskOpen, setEditTaskOpen }) {
  /* 
    Renders the Edit Task Dialog
  */
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const [values, setValues] = React.useState({
    taskName: task.task_name,
    assignee: task.task_assignee,
    selectedStatus: task.task_status,
    taskValue: task.task_value,
    taskDescription: task.task_descriptions,
    targetDate: task.task_due_date
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
    setEditTaskOpen(!editTaskOpen)
    setSnackbarOpen(!snackbarOpen)
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
              value={values.assignee ?? undefined}
              onChange={handleChange('assignee')}
              label="Assignee"
            >
              <MenuItem value={undefined}>
                <em>None</em>
              </MenuItem>
              {users.map((user) => (
                <MenuItem value={user.user_id}>{user.first_name + ' ' + user.last_name}</MenuItem>
              ))}
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
            value={values.taskValue ?? undefined}
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
            value={values.taskDescription ?? ''}
            onChange={handleChange('taskDescription')}
            type="text"
            fullWidth
            multiline
            variant="standard"
          />
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Basic example"
              value={values.targetDate}
              fullWidth
              onChange={handleChange('targetDate')}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Target date"
            value={values.targetDate ?? ''}
            onChange={handleChange('targetDate')}
            type="text"
            fullWidth
            variant="standard"
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
