import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import TaskCard from '../../components/TaskCard';
import StatusHeader from '../../components/TaskStatusHeader';
import CreateTaskCard from '../../components/TaskCreateCard';
import EditProjectDialog from '../../components/dialogs/EditProjectDialog';

import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';

export default function Project({ projects, tasks, users }) {
  const { projectId } = useParams();
  const backlogTasks = tasks.filter(task => task.task_status === 'Backlog');
  const inProgressTasks = tasks.filter(task => task.task_status === 'In Progress');
  const blockedTasks = tasks.filter(task => task.task_status === 'Blocked');
  const inReviewTasks = tasks.filter(task => task.task_status === 'In Review');
  const closedTasks = tasks.filter(task => task.task_status === 'Closed');
  const taskStates = ['Backlog', 'In Progress', 'Blocked', 'In Review', 'Closed']
  const [editNameOpen, setEditNameOpen] = React.useState(false);

  const handleEditNameClickOpen = () => {
    setEditNameOpen(!editNameOpen);
  };

  const getProjectName = (projects, projectId) => {
    let projectName = '';

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].project_id === parseInt(projectId)) {
        projectName = projects[i].project_name
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
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            {getProjectName(projects, projectId)}
          </Typography>
          <IconButton sx={{ ml: 2 }} onClick={handleEditNameClickOpen}>
            <BorderColorIcon/>
          </IconButton>
        </Box>
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
      <EditProjectDialog
        projectName={getProjectName(projects, projectId)}
        projectId={projectId}
        open={editNameOpen}
        setOpen={setEditNameOpen}
      />
    </>
  );
};
