import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateWorkspace({ open, handleClose }) {
  /* 
    Renders the Create Workspace Dialog
  */

  return (
    <Dialog open={open} onClose={handleClose}>
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
