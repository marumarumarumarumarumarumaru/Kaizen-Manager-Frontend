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


class CreateTaskDialog extends React.Component {
  /* 
    Renders the Create Project Dialog
  */
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      assignee: undefined,
      selectedStatus: this.props.selectedStatus,
      taskValue: undefined,
      taskDescription: '',
      errors: []
    }
  }

  handleClose = () => {
    this.props.setNewTaskOpen(false);
  };

  handleNewTaskClose = () => {
    this.props.setNewTaskOpen(false);
    this.props.setSnackbarOpen(!this.props.snackbarOpen);
  };

  render() {
    return (
      <>
        <Dialog open={this.props.newTaskOpen} onClose={this.props.handleClose}>
          <DialogTitle>Create new task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill in below to create a new "{this.props.selectedStatus}" task. Status can be changed later.
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
            <TextField
              disabled
              margin="dense"
              id="name"
              label="Status"
              value={this.state.selectedStatus}
              type="text"
              fullWidth
              variant="standard"
            />
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
            <Button onClick={this.handleNewTaskClose}>Create</Button>
          </DialogActions>
        </Dialog>
        <AlertSnackbar 
          open={this.props.snackbarOpen} 
          setOpen={this.props.setSnackbarOpen} 
          severity={'success'}
          message={'Task has been created'}
        />
      </>
    );
  }
}

export default CreateTaskDialog;
