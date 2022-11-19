import React from 'react';
import Button from '@mui/material/Button';
// For the dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AlertSnackbar from '../AlertSnackbar';

export default function DeleteTaskDialog({ task, delTaskOpen, setDelTaskOpen }) {
  /* 
    Renders the Logout Dialog
  */

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  // const [errors, setErrors] = React.useState([]);

  const handleClose = () => {
    setDelTaskOpen(false);
  };

  const handleDelete = () => {
    setDelTaskOpen(false);
    setSnackbarOpen(!snackbarOpen)
  };

  return (
    <>
      <Dialog
        open={delTaskOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Delete "' + task.name + '"'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Task has been deleted'}
      />
    </>
  );
}
