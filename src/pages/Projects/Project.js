import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import TaskCard from '../../components/taskCard';
import StatusHeader from '../../components/taskStatusHeader';
import CreateTaskCard from '../../components/taskCreateCard';

import { useParams } from 'react-router-dom';
import CreateTaskDialog from '../../components/dialogs/CreateTaskDialog';
import AlertSnackbar from '../../components/AlertSnackbar';

function Project({ projects, tasks, users }) {
  const { projectId } = useParams();
  const backlogTasks = tasks.filter(task => task.taskStatus === 'Backlog');
  const inProgressTasks = tasks.filter(task => task.taskStatus === 'In Progress');
  const blockedTasks = tasks.filter(task => task.taskStatus === 'Blocked');
  const inReviewTasks = tasks.filter(task => task.taskStatus === 'In Review');
  const closedTasks = tasks.filter(task => task.taskStatus === 'Closed');

  const [snackbarCreateTaskOpen, setSnackbarCreateTaskOpen] = React.useState(false);
  const [newTaskOpen, setNewTaskOpen] = React.useState(false);

  const handleNewTaskClickOpen = () => {
    setNewTaskOpen(!newTaskOpen);
  };

  const getProjectName = (projects, projectId) => {
    console.log(projectId);
    let projectName = '';

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === projectId) {
        projectName = projects[i].name
      }
    } 
    return projectName;
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {getProjectName(projects, projectId)}
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={2.4}>
          <StatusHeader status='Backlog'/>
          {backlogTasks.map((task) => (
            <TaskCard id={task.id} name={task.name} assignee={task.assignee} targetDate={task.targetDate}/>
          ))}
          <CreateTaskCard taskStatus='Backlog' handleClick={handleNewTaskClickOpen}/>
        </Grid>
        <Grid item md={2.4}>
          <StatusHeader status='In Progress'/>
          {inProgressTasks.map((task) => (
            <TaskCard id={task.id} name={task.name} assignee={task.assignee} targetDate={task.targetDate}/>
          ))}
          <CreateTaskCard taskStatus='In Progress' handleClick={handleNewTaskClickOpen}/>
        </Grid>
        <Grid item md={2.4}>
          <StatusHeader status='Blocked'/>
          {blockedTasks.map((task) => (
            <TaskCard id={task.id} name={task.name} assignee={task.assignee} targetDate={task.targetDate}/>
          ))}
          <CreateTaskCard taskStatus='Blocked' handleClick={handleNewTaskClickOpen}/>
        </Grid>
        <Grid item md={2.4}>
          <StatusHeader status='In Review' handleClick={handleNewTaskClickOpen}/>
          {inReviewTasks.map((task) => (
            <TaskCard id={task.id} name={task.name} assignee={task.assignee} targetDate={task.targetDate}/>
          ))}
          <CreateTaskCard taskStatus='In Review' handleClick={handleNewTaskClickOpen}/>
        </Grid>
        <Grid item md={2.4}>
          <StatusHeader status='Closed'/>
          {closedTasks.map((task) => (
            <TaskCard id={task.id} name={task.name} assignee={task.assignee} targetDate={task.targetDate}/>
          ))}
          <CreateTaskCard taskStatus='Closed' handleClick={handleNewTaskClickOpen}/>
        </Grid>
      </Grid>  
      <CreateTaskDialog users={users} newTaskOpen={newTaskOpen} setNewTaskOpen={setNewTaskOpen} snackbarOpen={snackbarCreateTaskOpen} setSnackbarOpen={setSnackbarCreateTaskOpen}/>
      <AlertSnackbar
        open={snackbarCreateTaskOpen}
        setOpen={setSnackbarCreateTaskOpen}
        severity={'success'}
        message={'Task has been created'}
      />
    </>
  );
};

export default Project;