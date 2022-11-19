import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import TaskCard from '../../components/TaskCard';
import StatusHeader from '../../components/TaskStatusHeader';
import CreateTaskCard from '../../components/TaskCreateCard';

import { useParams } from 'react-router-dom';

export default function Project({ projects, tasks, users }) {
  const { projectId } = useParams();
  const backlogTasks = tasks.filter(task => task.taskStatus === 'Backlog');
  const inProgressTasks = tasks.filter(task => task.taskStatus === 'In Progress');
  const blockedTasks = tasks.filter(task => task.taskStatus === 'Blocked');
  const inReviewTasks = tasks.filter(task => task.taskStatus === 'In Review');
  const closedTasks = tasks.filter(task => task.taskStatus === 'Closed');
  const taskStates = ['Backlog', 'In Progress', 'Blocked', 'In Review', 'Closed']

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
      <Box sx={{
        m: 2,
        flexsDirection: 'column',
      }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          {getProjectName(projects, projectId)}
        </Typography>
        <Grid container spacing={4}>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[0]}/>
            {backlogTasks.map((task, index) => (
              <TaskCard task={backlogTasks[index]} users={users}/>
            ))}
            <CreateTaskCard selectedStatus={taskStates[0]} users={users}/>
          </Grid>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[1]}/>
            {inProgressTasks.map((task, index) => (
              <TaskCard task={inProgressTasks[index]} users={users}/>
              ))}
            <CreateTaskCard selectedStatus={taskStates[1]} users={users}/>
          </Grid>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[2]}/>
            {blockedTasks.map((task, index) => (
              <TaskCard task={blockedTasks[index]} users={users}/>
              ))}
            <CreateTaskCard selectedStatus={taskStates[2]} users={users}/>
          </Grid>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[3]}/>
            {inReviewTasks.map((task, index) => (
              <TaskCard task={inReviewTasks[index]} users={users}/>
              ))}
            <CreateTaskCard selectedStatus={taskStates[3]} users={users}/>
          </Grid>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[4]}/>
            {closedTasks.map((task, index) => (
              <TaskCard task={closedTasks[index]} users={users}/>
              ))}
            <CreateTaskCard selectedStatus={taskStates[4]} users={users}/>
          </Grid>
        </Grid>  
      </Box>
    </>
  );
};
