import React from 'react'
import Button from '@mui/material/Button'
// For the dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import AlertSnackbar from '../AlertSnackbar'
import { Box, FormHelperText, TextField } from '@mui/material'

export default function AddMemberDialog({ open, setOpen, currentWorkspace, workspaceName }) {
  /* 
    Renders the Remove member dialog
  */
  const [values, setValues] = React.useState({
    email: '',
    role: 'member',
  })
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const roles = ['owner', 'pm', 'member']
  // const [errors, setErrors] = React.useState([])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const handleAdd = () => {
    setOpen(!open)
    setSnackbarOpen(!snackbarOpen)
    // Add the user to the workspace
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Add an user to ' + workspaceName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description1">
            Enter the email address of the user you'd like to add to this workspace.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description2">
            Note that user must have an account on Kaizen Manager.
          </DialogContentText>
          <Box sx={{ 
            display: "flex", flexDirection: "row", justifyContent: "space-between",
            alignItems: "baseline", mt: 1
            }}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              value={values.email}
              onChange={handleChange('email')}
              type="text"
              fullWidth
              variant="standard"
            />
            <FormControl sx={{ ml: 2, minWidth: 120 }}size="small">
              <Select
                labelId="update-role-select-small"
                id="update-role-select-small"
                value={values.role}
                onChange={handleChange('role')}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {roles.map((role) => (
                  <MenuItem value={role}>{role.toUpperCase()}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Assign a role</FormHelperText>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} autoFocus>Add</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'User has been added to this workspace'}
      />
    </>
  )
}
