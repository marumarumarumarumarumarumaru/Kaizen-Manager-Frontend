import React from 'react'
import { Box, Grid, Paper, Typography, Tooltip, IconButton } from '@mui/material'
import { BorderColor as BorderColorIcon } from '@mui/icons-material'

import TaskCard from '../../components/TaskCard'
import CreateTaskCard from '../../components/TaskCreateCard'
import EditProjectNameDialog from '../../components/dialogs/EditProjectNameDialog'
import { getProjectName } from '../../utils/ProjectsFns'
import AlertSnackbar from '../../components/AlertSnackbar'

/**
 * Renders the Project page
 * 
 * @param {array} projects
 * @param {function} setShowDrawer 
 * @param {function} setCurrentProject 
 * @param {integer} currentWorkspace 
 * @param {object} currentUser 
 * @param {string} currentUserRole 
 * @param {array} users 
 * @param {function} setProjects 
 * 
 * @returns render()
 */
export default function Project({ 
  projects, currentWorkspace, currentProject, currentUser, currentUserRole, users, setProjects
}) {
  const [projTasks, setProjTasks] = React.useState()
  const [backlogTasks, setBacklogTasks] = React.useState()
  const [inProgressTasks, setInProgressTasks] = React.useState()
  const [blockedTasks, setBlockedTasks] = React.useState()
  const [inReviewTasks, setInReviewTasks] = React.useState()
  const [closedTasks, setClosedTasks] = React.useState()
  const [editNameOpen, setEditNameOpen] = React.useState(false)
  const [currentProjectName, setCurrentProjectName] = React.useState(getProjectName(projects, currentProject))
  const [editTaskSnackbarOpen, setEditTaskSnackbarOpen] = React.useState(false)
  const [moveTaskSnackbarOpen, setMoveTaskSnackbarOpen] = React.useState(false)
  const [delTaskSnackbarOpen, setDelTaskSnackbarOpen] = React.useState(false)
  const taskStates = ['Backlog', 'In Progress', 'Blocked', 'In Review', 'Closed']

  React.useEffect(() => {
    if (projTasks) {
      setBacklogTasks(projTasks.filter(task => task.task_status === 'Backlog'))
      setInProgressTasks(projTasks.filter(task => task.task_status === 'In Progress'))
      setBlockedTasks(projTasks.filter(task => task.task_status === 'Blocked'))
      setInReviewTasks(projTasks.filter(task => task.task_status === 'In Review'))
      setClosedTasks(projTasks.filter(task => task.task_status === 'Closed'))
    }
  }, [projTasks])

  React.useEffect(() => {
    setCurrentProjectName(getProjectName(projects, currentProject))
  }, [projects, currentProject])

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
          setProjTasks(tasks)
        }      
      }
    }

    fetchData()
    return () => {
      retrieveData = false
    }
    // Disables the eslint complaining about the dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProject])

  const handleEditNameClickOpen = () => {
    setEditNameOpen(!editNameOpen)
  }

  return (
    <React.Fragment>
      <Box sx={{
        m: 2,
        flexsDirection: 'column',
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
          <Typography variant='h4' sx={{ mb: 4 }}>
            {currentProjectName}
          </Typography>
          {['owner', 'pm'].includes(currentUserRole)
          ? <Tooltip title='Update name'>
              <IconButton sx={{ ml: 2 }} onClick={handleEditNameClickOpen}>
                <BorderColorIcon/>
              </IconButton>
            </Tooltip>
          : null}
        </Box>
        <Grid container spacing={4}>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[0]}/>
            {backlogTasks
            ? (backlogTasks.map((task, index) => (
                <TaskCard 
                  task={backlogTasks[index]} 
                  users={users}
                  currentWorkspace={currentWorkspace}
                  currentProject={currentProject}
                  currentUser={currentUser}
                  setProjTasks={setProjTasks}
                  setEditTaskSnackbarOpen={setEditTaskSnackbarOpen}
                  setMoveTaskSnackbarOpen={setMoveTaskSnackbarOpen}
                  setDelTaskSnackbarOpen={setDelTaskSnackbarOpen}
                />
              )))
            : null}
            <CreateTaskCard 
              currentWorkspace={currentWorkspace}
              currentProject={currentProject}
              currentUser={currentUser}
              selectedStatus={taskStates[0]} 
              users={users}
              setProjTasks={setProjTasks}
            />
          </Grid>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[1]}/>
            {inProgressTasks
            ? (inProgressTasks.map((task, index) => (
                <TaskCard 
                  task={inProgressTasks[index]} 
                  users={users}
                  currentWorkspace={currentWorkspace}
                  currentProject={currentProject}
                  currentUser={currentUser}
                  setProjTasks={setProjTasks}
                  setEditTaskSnackbarOpen={setEditTaskSnackbarOpen}
                  setMoveTaskSnackbarOpen={setMoveTaskSnackbarOpen}
                  setDelTaskSnackbarOpen={setDelTaskSnackbarOpen}
                />
              )))
            : null}
            <CreateTaskCard 
              currentWorkspace={currentWorkspace}
              currentProject={currentProject}
              currentUser={currentUser}
              selectedStatus={taskStates[1]} 
              users={users}
              setProjTasks={setProjTasks}
            />
          </Grid>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[2]}/>
            {blockedTasks
            ? (blockedTasks.map((task, index) => (
                <TaskCard 
                  task={blockedTasks[index]} 
                  users={users}
                  currentWorkspace={currentWorkspace}
                  currentProject={currentProject}
                  currentUser={currentUser}
                  setProjTasks={setProjTasks}
                  setEditTaskSnackbarOpen={setEditTaskSnackbarOpen}
                  setMoveTaskSnackbarOpen={setMoveTaskSnackbarOpen}
                  setDelTaskSnackbarOpen={setDelTaskSnackbarOpen}
                />
              )))
            : null}
            <CreateTaskCard 
              currentWorkspace={currentWorkspace}
              currentProject={currentProject}
              currentUser={currentUser}
              selectedStatus={taskStates[2]} 
              users={users}
              setProjTasks={setProjTasks}
            />
          </Grid>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[3]}/>
            {inReviewTasks
            ? (inReviewTasks.map((task, index) => (
                <TaskCard 
                  task={inReviewTasks[index]} 
                  users={users}
                  currentWorkspace={currentWorkspace}
                  currentProject={currentProject}
                  currentUser={currentUser}
                  setProjTasks={setProjTasks}
                  setEditTaskSnackbarOpen={setEditTaskSnackbarOpen}
                  setMoveTaskSnackbarOpen={setMoveTaskSnackbarOpen}
                  setDelTaskSnackbarOpen={setDelTaskSnackbarOpen}
                />
              )))
            : null}
            <CreateTaskCard 
              currentWorkspace={currentWorkspace}
              currentProject={currentProject}
              currentUser={currentUser}
              selectedStatus={taskStates[3]} 
              users={users}
              setProjTasks={setProjTasks}
            />
          </Grid>
          <Grid item md={2.4}>
            <StatusHeader status={taskStates[4]}/>
            {closedTasks
            ? (closedTasks.map((task, index) => (
                <TaskCard 
                  task={closedTasks[index]} 
                  users={users}
                  currentWorkspace={currentWorkspace}
                  currentProject={currentProject}
                  currentUser={currentUser}
                  setProjTasks={setProjTasks}
                  setEditTaskSnackbarOpen={setEditTaskSnackbarOpen}
                  setMoveTaskSnackbarOpen={setMoveTaskSnackbarOpen}
                  setDelTaskSnackbarOpen={setDelTaskSnackbarOpen}
                />
              )))
            : null}
            <CreateTaskCard 
              currentWorkspace={currentWorkspace}
              currentProject={currentProject}
              currentUser={currentUser}
              selectedStatus={taskStates[4]} 
              users={users}
              setProjTasks={setProjTasks}
            />
          </Grid>
        </Grid>  
      </Box>
      <EditProjectNameDialog
        projectName={currentProjectName}
        projectId={currentProject}
        open={editNameOpen}
        setOpen={setEditNameOpen}
        currentWorkspace={currentWorkspace}
        currentUser={currentUser}
        setProjects={setProjects}
      />
      <AlertSnackbar 
        open={editTaskSnackbarOpen} 
        setOpen={setEditTaskSnackbarOpen} 
        severity={'success'}
        message={'Task has been updated'}
      /> 
      <AlertSnackbar 
        open={moveTaskSnackbarOpen} 
        setOpen={setMoveTaskSnackbarOpen} 
        severity={'success'}
        message={'Task has been moved'}
      />
      <AlertSnackbar 
        open={delTaskSnackbarOpen} 
        setOpen={setDelTaskSnackbarOpen} 
        severity={'success'}
        message={'Task has been deleted'}
      />
    </React.Fragment>
  )
}

function StatusHeader({ status }) {
  return (
    <Paper elevation={24} key={status}>
      <Typography variant='h5' sx={{ m: 2, paddingY: 2 }}>{status}</Typography>
    </Paper>
  )
}
