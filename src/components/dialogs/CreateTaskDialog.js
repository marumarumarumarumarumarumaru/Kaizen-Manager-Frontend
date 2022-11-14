import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlertSnackbar from '../AlertSnackbar';

export default function CreateTaskDialog({ taskStatus, projectId, newTaskOpen, setNewTaskOpen, snackbarOpen, setSnackbarOpen }) {
  /* 
    Renders the Create Project Dialog
  */
  const handleClose = () => {
    setNewTaskOpen(false);
  };

  const handleNewTaskClose = () => {
    setNewTaskOpen(false);
    setSnackbarOpen(!snackbarOpen);
  };

  return (
    <>
      <Dialog open={newTaskOpen} onClose={handleClose}>
        <DialogTitle>Create new task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in below to create a new "{taskStatus}" task. Status can be changed later.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task name"
            type="text"
            fullWidth
            variant="standard"
          />
          {/* TODO: Make it a dropdown from users in workspace */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Assignee"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            disabled
            margin="dense"
            id="name"
            label="Status"
            defaultValue={taskStatus}
            type="text"
            fullWidth
            variant="standard"

          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task value"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
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
  );
}
