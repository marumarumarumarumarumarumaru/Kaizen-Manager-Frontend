import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import EditTaskDialog from './dialogs/EditTaskDialog';
import MoveTaskDialog from './dialogs/MoveTaskDialog';
import DeleteTaskDialog from './dialogs/DeleteTaskDialog';

export default function TaskCard({ task, users }) {

  const [editTaskOpen, setEditTaskOpen] = React.useState(false);
  const [moveTaskOpen, setMoveTaskOpen] = React.useState(false);
  const [delTaskOpen, setDelTaskOpen] = React.useState(false);

  const handleDelTaskClickOpen = () => {
    setDelTaskOpen(!delTaskOpen);
  };

  const handleMoveTaskClickOpen = () => {
    setMoveTaskOpen(!moveTaskOpen);
  };

  const handleEditTaskClickOpen = () => {
    setEditTaskOpen(!editTaskOpen);
  };

  const getAssigneeFirstName = (assigneeId) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].user_id === assigneeId) {
        return users[i].first_name
      }
    }
    return null;
  }

  return (
    <>
      <Card key={'task' + task.task_id} sx={{ mb: 2 }} elevation={4}>
        <CardActionArea onClick={handleEditTaskClickOpen}>
          <CardContent>
            <Typography noWrap gutterBottom variant="h6" component="div" sx={{ mb: 1 }}>
              {task.task_name}
            </Typography>
            {/* Color: succes, warning, error  */}
            {/* TODO: Do a date comparison check with current date + color accordingly */}
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Chip color="error" label={task.task_due_date}/>
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
  );
}