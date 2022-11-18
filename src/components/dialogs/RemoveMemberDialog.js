import React from 'react';
import Button from '@mui/material/Button';
// For the dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AlertSnackbar from '../AlertSnackbar';

export default function RemoveMemberDialog({ user, removeUserOpen, setRemoveUserOpen }) {
  /* 
    Renders the Remove member dialog
  */
  const fullName = user.firstName + ' ' + user.lastName;
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  // const [errors, setErrors] = React.useState([]);

  const handleClose = () => {
    setRemoveUserOpen(false);
  };

  const handleRemove = () => {
    setRemoveUserOpen(false);
    setSnackbarOpen(!snackbarOpen)
    // Remove the user from workspace
  };

  return (
    <>
      <Dialog
        open={removeUserOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Remove ' + fullName + ' from current workspace'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove {fullName} from this workspace?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRemove} autoFocus>Remove</Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={fullName + ' has been removed from this workspace'}
      />
    </>
  );
}
