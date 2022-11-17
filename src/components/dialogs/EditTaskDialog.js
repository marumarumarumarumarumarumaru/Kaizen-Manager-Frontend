import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlertSnackbar from '../AlertSnackbar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

class EditTaskDialog extends React.Component {
  /* 
    Renders the Create Project Dialog
  */
  constructor(props) {
    super(props);
    this.state = {
      taskName: this.props.task.name,
      assignee: this.props.task.assignee,
      selectedStatus: this.props.task.taskStatus,
      taskValue: this.props.task.value,
      taskDescription: this.props.task.description,
      targetDate: this.props.task.targetDate,
      taskStatus: ['Backlog', 'In Progress', 'Blocked', 'In Review', 'Closed'],
      errors: []
    }
  }

  handleClose = () => {
    this.props.setEditTaskOpen(false);
  };

  handleEditTaskClose = () => {
    this.props.setEditTaskOpen(false);
    this.props.setSnackbarOpen(!this.props.snackbarOpen);
  };

  render() {
    return (
      <>
        <Dialog open={this.props.editTaskOpen} onClose={this.props.handleClose}>
          <DialogTitle>Edit a task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the details below to update the task.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task name"
              value={this.state.taskName}
              onChange={e => this.setState({ taskName: e.target.value })}
              type="text"
              fullWidth
              variant="standard"
            />
            <FormControl variant="standard" fullWidth>
              <InputLabel id="assignee-select-label">Assignee</InputLabel>
              <Select
                labelId="assignee-select-standard-label"
                id="assignee-select-standard"
                value={this.state.assignee ?? undefined}
                onChange={e => this.setState({ assignee: e.target.value })}
                label="Assignee"
              >
                <MenuItem value={undefined}>
                  <em>None</em>
                </MenuItem>
                {this.props.users.map((user) => (
                  <MenuItem value={user.id}>{user.firstName + ' ' + user.lastName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-standard-label"
                id="status-select-standard"
                value={this.state.selectedStatus}
                onChange={e => this.setState({ selectedStatus: e.target.value })}
                label="Status"
              >
                {this.state.taskStatus.map((status) => (
                  <MenuItem value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task value"
              value={this.state.taskValue ?? undefined}
              onChange={e => this.setState({ taskValue: e.target.value })}
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              value={this.state.taskDescription ?? ''}
              onChange={e => this.setState({ taskDescription: e.target.value })}
              type="text"
              fullWidth
              multiline
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleEditTaskClose}>Update</Button>
          </DialogActions>
        </Dialog>
        <AlertSnackbar 
          open={this.props.snackbarOpen} 
          setOpen={this.props.setSnackbarOpen} 
          severity={'success'}
          message={'Task has been updated'}
        />
      </>
    );
  }
}

export default EditTaskDialog;
