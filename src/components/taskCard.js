import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { format } from 'date-fns'

import EditTaskDialog from './dialogs/EditTaskDialog'
import MoveTaskDialog from './dialogs/MoveTaskDialog'
import DeleteTaskDialog from './dialogs/DeleteTaskDialog'

export default function TaskCard({ task, users }) {

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
    <>
      <Card key={'task' + task.task_id} sx={{ mb: 2 }} elevation={4}>
        <CardActionArea onClick={handleEditTaskClickOpen}>
          <CardContent>
            <Typography noWrap gutterBottom variant="h6" component="div" sx={{ mb: 1 }}>
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
          <Button size="small" onClick={handleMoveTaskClickOpen}>Move</Button>
          <Button size="small" onClick={handleDelTaskClickOpen}>Delete</Button>
        </CardActions>
      </Card>
      <EditTaskDialog 
        task={task}
        users={users} 
        editTaskOpen={editTaskOpen} 
        setEditTaskOpen={setEditTaskOpen} 
      />
      <MoveTaskDialog
        task={task}
        moveTaskOpen={moveTaskOpen} 
        setMoveTaskOpen={setMoveTaskOpen} 
      />
      <DeleteTaskDialog
        task={task}
        delTaskOpen={delTaskOpen}
        setDelTaskOpen={setDelTaskOpen}
      />
    </>
  )
}

/**
 * Determine chip color based on target date
 * * "error": red
 * * "warning": yellow
 * * "success": green
 * * null: grey
 * 
 * @param {*} targetDate - string
 * @param {*} taskStatus - string
 * 
 * @returns - string
 */
function CheckTargetDate(targetDate, taskStatus) {
  const date = Date.parse(targetDate)
  const today = new Date()
  let difference = date - today
  let totalDays = Math.ceil(difference / (1000 * 3600 * 24))
  // If target date today or in the past, show red
  if (totalDays <= 0) {
    return "error"
  // Else if target date is within the next 2 weeks, show yellow
  } else if (14 >= totalDays) {
    return "warning"
  // Else if the task is already closed, show grey
  } else if (taskStatus === "Closed") {
    return
  // Otherwise, show green
  } else {
    return "success"
  }
}

function FormatDate(targetDate) {
  const formattingStyle = 'MMM dd, yyyy'
  return format(Date.parse(targetDate), formattingStyle)
}