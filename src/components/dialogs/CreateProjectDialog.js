import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlertSnackbar from '../AlertSnackbar';

export default function CreateProject({ newProjectOpen, handleNewProjectClose, snackbarOpen, setSnackbarOpen  }) {
  /* 
    Renders the Create Project Dialog
  */
  return (
    <>
      <Dialog open={newProjectOpen} onClose={handleNewProjectClose}>
        <DialogTitle>Create a project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Specify the name of the project to create a new one.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewProjectClose}>Cancel</Button>
          <Button onClick={handleNewProjectClose}>Create</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar 
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Project has been created'}
      />
    </>
  );
}
