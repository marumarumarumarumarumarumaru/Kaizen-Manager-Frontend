import React from 'react';
import Button from '@mui/material/Button';
// For the dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AlertSnackbar from '../AlertSnackbar';

class MoveTaskDialog extends React.Component {
  /* 
    Renders the Logout Dialog
  */
  constructor(props) {
    super(props);
    this.state = {
      selectedStatus: this.props.task.taskStatus,
      taskStatus: ['Backlog', 'In Progress', 'Blocked', 'In Review', 'Closed'],
      errors: []
    }
  }

  handleClose = () => {
    this.props.setMoveTaskOpen(false);
  };

  handleStatusUpdate = () => {
    this.props.setMoveTaskOpen(false);
    this.props.setSnackbarOpen(!this.props.snackbarOpen);
  };

  render() {
    return (
      <>
        <Dialog
          open={this.props.moveTaskOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Move "' + this.props.task.name + '" to a different state'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Select the state you'd like to apply for this task
            </DialogContentText>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="update-status-select-label">Status</InputLabel>
              <Select
                labelId="update-status-select-standard-label"
                id="update-status-select-standard"
                value={this.state.selectedStatus}
                onChange={e => this.setState({ selectedStatus: e.target.value })}
                label="Status"
              >
                {this.state.taskStatus.map((status) => (
                  <MenuItem value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleStatusUpdate} autoFocus>Update</Button>
          </DialogActions>
        </Dialog>
        <AlertSnackbar 
          open={this.props.snackbarOpen} 
          setOpen={this.props.setSnackbarOpen} 
          severity={'success'}
          message={'Task has been moved to "' + this.state.selectedStatus + '"'}
        />
      </>
    );
  }
}

export default MoveTaskDialog;
