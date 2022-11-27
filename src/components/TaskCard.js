import React from 'react'
import { Avatar, Box, Card, Chip, CardContent, Button, CardActionArea, CardActions, Typography } from '@mui/material'
import { format } from 'date-fns'

import EditTaskDialog from './dialogs/EditTaskDialog'
import UpdateTaskStatusDialog from './dialogs/UpdateTaskStatusDialog'
import DeleteTaskDialog from './dialogs/DeleteTaskDialog'

/**
 * Renders the Card for task
 * 
 * Parameters passed down from Project
 * @param {object} task
 * @param {array} users
 * @param {integer} currentWorkspace
 * @param {integer} currentProject
 * @param {object} currentUser
 * @param {function} setProjTasks
 *  
 * @returns render()
 */
export default function TaskCard({ 
  task, users, currentWorkspace, currentProject, currentUser, setProjTasks
}) {

  const [editTaskOpen, setEditTaskOpen] = React.useState(false)
  const [moveTaskOpen, setMoveTaskOpen] = React.useState(false)
  const [delTaskOpen, setDelTaskOpen] = React.useState(false)

  const handleDelTaskClickOpen = () => {
    setDelTaskOpen(!delTaskOpen)
  }

  const handleMoveTaskClickOpen = () => {
    setMoveTaskOpen(!moveTaskOpen)
  }

  const handleEditTaskClickOpen = () => {
    setEditTaskOpen(!editTaskOpen)
  }

  const getAssigneeFirstName = (assigneeId) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].user_id === assigneeId) {
        return users[i].first_name
      }
    }
    return null
  }

  return (
    <React.Fragment>
      <Card key={'task' + task.task_id} sx={{ mb: 2 }} elevation={4}>
        <CardActionArea onClick={handleEditTaskClickOpen}>
          <CardContent>
            <Typography noWrap gutterBottom variant='h6' component='div' sx={{ mb: 1 }}>
              {task.task_name}
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Chip color={CheckTargetDate(task.task_due_date, task.task_status)} label={FormatDate(task.task_due_date)}/>
              <Avatar sx={{ width: 36, height: 36, ml: 1 }}>
                {task.task_assignee ? getAssigneeFirstName(task.task_assignee).charAt(0) : null}
              </Avatar>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' onClick={handleMoveTaskClickOpen}>Move</Button>
          <Button size='small' onClick={handleDelTaskClickOpen}>Delete</Button>
        </CardActions>
      </Card>
      <EditTaskDialog 
        task={task}
        users={users} 
        editTaskOpen={editTaskOpen} 
        setEditTaskOpen={setEditTaskOpen} 
        currentWorkspace={currentWorkspace}
        currentProject={currentProject}
        currentUser={currentUser}
        setProjTasks={setProjTasks}
      />
      <UpdateTaskStatusDialog
        task={task}
        moveTaskOpen={moveTaskOpen} 
        setMoveTaskOpen={setMoveTaskOpen} 
        currentWorkspace={currentWorkspace}
        currentProject={currentProject}
        currentUser={currentUser}
        setProjTasks={setProjTasks}
      />
      <DeleteTaskDialog
        task={task}
        delTaskOpen={delTaskOpen}
        setDelTaskOpen={setDelTaskOpen}
        currentWorkspace={currentWorkspace}
        currentProject={currentProject}
        currentUser={currentUser}
        setProjTasks={setProjTasks}
      />
    </React.Fragment>
  )
}

/**
 * Determine chip color based on target date
 * * 'error': red
 * * 'warning': yellow
 * * 'success': green
 * * null: grey
 * 
 * @param {string} targetDate - string
 * @param {string} taskStatus - string
 * 
 * @returns - string
 */
function CheckTargetDate(targetDate, taskStatus) {
  if (targetDate) {
    const date = Date.parse(targetDate)
    const today = new Date()
    let difference = date - today
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24))
    // If target date today or in the past, show red
    if (totalDays <= 0) {
      return 'error'
    // Else if the task is already closed, show grey
    } else if (taskStatus === 'Closed') {
      return
    // Else if target date is within the next 2 weeks, show yellow
    } else if (14 >= totalDays) {
      return 'warning'
    // Otherwise, show green
    } else {
      return 'success'
    }
  } else {
    return
  }
}

function FormatDate(targetDate) {
  if (targetDate) {
    const formattingStyle = 'MMM dd, yyyy'
    return format(Date.parse(targetDate), formattingStyle)
  } else {
    return 'n/a'
  }
}