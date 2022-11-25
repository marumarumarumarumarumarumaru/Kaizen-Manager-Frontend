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

export default function CreateTaskDialog ({ selectedStatus, users, newTaskOpen, setNewTaskOpen, snackbarOpen, setSnackbarOpen}) {
  /* 
    Renders the Create Project Dialog
  */

  const [values, setValues] = React.useState({
    taskName: '',
    assignee: undefined,
    selectedStatus: selectedStatus,
    taskValue: undefined,
    taskDescription: '',
    targetDate: undefined
  })

  // const [errors, setErrors] = React.useState([])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClose = () => {
    setNewTaskOpen(!newTaskOpen)
  }

  const handleNewTaskClose = () => {
    setNewTaskOpen(!newTaskOpen)
    setSnackbarOpen(!snackbarOpen)
  }

  return (
    <>
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
              value={values.assignee ?? undefined}
              onChange={handleChange('assignee')}
              label="Assignee"
            >
              <MenuItem value={undefined}>
                <em>None</em>
              </MenuItem>
              {users.map((user) => (
                <MenuItem value={user.id}>{user.firstName + ' ' + user.lastName}</MenuItem>
              ))}
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
            label="Description"
            value={values.taskDescription ?? ''}
            onChange={handleChange('taskDescription')}
            type="text"
            fullWidth
            multiline
            variant="standard"
          />
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
          <Button onClick={handleNewTaskClose}>Create</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar 
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Task has been created'}
      />
    </>
  )
}
