import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import TaskCard from '../../components/taskCard';
import StatusHeader from '../../components/taskStatusHeader';
import CreateTaskCard from '../../components/taskCreateCard';

import { useParams } from 'react-router-dom';

function Project({ projects, tasks }) {
  const { projectId } = useParams();
  const backlogTasks = tasks.filter(task => task.taskStatus === 'Backlog');
  const inProgressTasks = tasks.filter(task => task.taskStatus === 'In Progress');
  const blockedTasks = tasks.filter(task => task.taskStatus === 'Blocked');
  const inReviewTasks = tasks.filter(task => task.taskStatus === 'In Review');
  const closedTasks = tasks.filter(task => task.taskStatus === 'Closed');

  const getProjectName = (projects, projectId) => {
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
        <Grid item md={2}>
          <StatusHeader status='Backlog'/>
          {backlogTasks.map((task) => (
            <TaskCard id={task.id} name={task.name} assignee={task.assignee} targetDate={task.targetDate}/>
          ))}
          <CreateTaskCard status='Backlog'/>
        </Grid>
        <Grid item md={2}>
          <StatusHeader status='In Progress'/>
          {inProgressTasks.map((task) => (
            <TaskCard id={task.id} name={task.name} assignee={task.assignee} targetDate={task.targetDate}/>
          ))}
          <CreateTaskCard status='In Progress'/>
        </Grid>
        <Grid item md={2}>
          <StatusHeader status='Blocked'/>
          {blockedTasks.map((task) => (
            <TaskCard id={task.id} name={task.name} assignee={task.assignee} targetDate={task.targetDate}/>
          ))}
          <CreateTaskCard status='Blocked'/>
        </Grid>
        <Grid item md={2}>
          <StatusHeader status='In Review'/>
          {inReviewTasks.map((task) => (
            <TaskCard id={task.id} name={task.name} assignee={task.assignee} targetDate={task.targetDate}/>
          ))}
          <CreateTaskCard status='In Review'/>
        </Grid>
        <Grid item md={2}>
          <StatusHeader status='Closed'/>
          {closedTasks.map((task) => (
            <TaskCard id={task.id} name={task.name} assignee={task.assignee} targetDate={task.targetDate}/>
          ))}
          <CreateTaskCard status='Closed'/>
        </Grid>
      </Grid>  
    </>
  );
};

export default Project;