import React from 'react';
import Button from '@mui/material/Button';
// For the dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Link } from 'react-router-dom';

export default function DeleteAccountDialog({ open, setOpen }) {
  /* 
    Renders the Logout Dialog
  */
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAccount = () => {
    setOpen(false);
    // Method to delete the account
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete Account"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete your account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDeleteAccount} autoFocus component={Link} to={'/'}>
          Delete Account
        </Button>
      </DialogActions>
    </Dialog>
  );
}
