import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

import TaskCard from '../../components/TaskCard'
import CreateTaskCard from '../../components/TaskCreateCard'
import EditProjectDialog from '../../components/dialogs/EditProjectDialog'

export default function Project({ 
  projects, currentWorkspace, currentProject, currentUser, tasks, users, handleTasksUpdate
}) {
  const [projTasks, setProjTasks] = React.useState()
  const [backlogTasks, setBacklogTasks] = React.useState()
  const [inProgressTasks, setInProgressTasks] = React.useState()
  const [blockedTasks, setBlockedTasks] = React.useState()
  const [inReviewTasks, setInReviewTasks] = React.useState()
  const [closedTasks, setClosedTasks] = React.useState()

  React.useEffect(() => {
    let retrieveData = true
  
    const fetchData = async () => {
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const currTasksUrl = url + '/users/' + userId + '/workspaces/' + currentWorkspace + '/projects/' + currentProject + '/tasks'
      
      const getTasks = await fetch(currTasksUrl, {method: 'GET'})
      const tasks = await getTasks.json()
      if (retrieveData) {
        if (tasks) {
          // Store the tasks so in the case create/delete tasks happen, this useEffect triggers
          handleTasksUpdate(tasks)
          // Filter the tasks into respective status bucket
          setProjTasks(tasks.filter(task => task.proj_id === currentProject))
          if (projTasks) {
            setBacklogTasks(projTasks.filter(task => task.task_status === 'Backlog'))
            setInProgressTasks(projTasks.filter(task => task.task_status === 'In Progress'))
            setBlockedTasks(projTasks.filter(task => task.task_status === 'Blocked'))
            setInReviewTasks(projTasks.filter(task => task.task_status === 'In Review'))
            setClosedTasks(projTasks.filter(task => task.task_status === 'Closed'))
          }
        }      
      }
    }

    fetchData()
    return () => {
      retrieveData = false
    }
  }, [tasks])

  const taskStates = ['Backlog', 'In Progress', 'Blocked', 'In Review', 'Closed']
  const [editNameOpen, setEditNameOpen] = React.useState(false)

  const handleEditNameClickOpen = () => {
    setEditNameOpen(!editNameOpen)
  }

  const getProjectName = (projects) => {
    let projectName = ''

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].project_id === currentProject) {
        projectName = projects[i].project_name
      }
    } 
    return projectName
  }

  return (
    <>
      <Box sx={{
        m: 2,
        flexsDirection: 'column',
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            {getProjectName(projects)}
          </Typography>
          <Tooltip title="Update name">
            <IconButton sx={{ ml: 2 }} onClick={handleEditNameClickOpen}>
              <BorderColorIcon/>
            </IconButton>
          </Tooltip>
        </Box>
        <Grid container spacing={4}>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[0]}/>
            {backlogTasks
            ? (backlogTasks.map((task, index) => (
                <TaskCard task={backlogTasks[index]} users={users}/>
              )))
            : <></>}
            <CreateTaskCard selectedStatus={taskStates[0]} users={users}/>
          </Grid>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[1]}/>
            {inProgressTasks
            ? (inProgressTasks.map((task, index) => (
                <TaskCard task={inProgressTasks[index]} users={users}/>
              )))
            : <></>}
            <CreateTaskCard selectedStatus={taskStates[1]} users={users}/>
          </Grid>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[2]}/>
            {blockedTasks
            ? (blockedTasks.map((task, index) => (
                <TaskCard task={blockedTasks[index]} users={users}/>
              )))
            : <></>}
            <CreateTaskCard selectedStatus={taskStates[2]} users={users}/>
          </Grid>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[3]}/>
            {inReviewTasks
            ? (inReviewTasks.map((task, index) => (
                <TaskCard task={inReviewTasks[index]} users={users}/>
              )))
            : <></>}
            <CreateTaskCard selectedStatus={taskStates[3]} users={users}/>
          </Grid>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[4]}/>
            {closedTasks
            ? (closedTasks.map((task, index) => (
                <TaskCard task={closedTasks[index]} users={users}/>
              )))
            : <></>}
            <CreateTaskCard selectedStatus={taskStates[4]} users={users}/>
          </Grid>
        </Grid>  
      </Box>
      <EditProjectDialog
        projectName={getProjectName(projects)}
        projectId={currentProject}
        open={editNameOpen}
        setOpen={setEditNameOpen}
      />
    </>
  )
}

function StatusHeader({ status }) {
  return (
    <Paper elevation={24} key={status}>
      <Typography variant="h5" sx={{ m: 2, paddingY: 2 }}>{status}</Typography>
    </Paper>
  )
}
