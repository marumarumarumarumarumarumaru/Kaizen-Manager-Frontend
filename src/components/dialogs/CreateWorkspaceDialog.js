import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateWorkspaceDialog({ newWorkspaceOpen, setNewWorkspaceOpen, snackbarOpen, setSnackbarOpen }) {
  /* 
    Renders the Create Workspace Dialog
  */

  const handleDialogClose = () => {
    setNewWorkspaceOpen(false);
  };

  const handleNewWorkspaceClose = () => {
    setNewWorkspaceOpen(false);
    setSnackbarOpen(!snackbarOpen);
  };

  return (
    <Dialog open={newWorkspaceOpen} onClose={handleDialogClose}>
      <DialogTitle>Create a workspace</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Specify the name of the workspace to create a new one.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Workspace name"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={handleNewWorkspaceClose}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
