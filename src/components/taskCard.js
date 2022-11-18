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
    setDelTaskOpen(true);
  };

  const handleMoveTaskClickOpen = () => {
    setMoveTaskOpen(true);
  };

  const handleEditTaskClickOpen = () => {
    setEditTaskOpen(true);
  };

  const getAssigneeFirstName = (assigneeId) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === assigneeId) {
        return users[i].firstName
      }
    }
    return null;
  }

  return (
    <>
      <Card key={'task' + task.id} sx={{ mb: 2 }} elevation={4}>
        <CardActionArea onClick={handleEditTaskClickOpen}>
          <CardContent>
            <Typography noWrap gutterBottom variant="h6" component="div" sx={{ mb: 1 }}>
              {task.name}
            </Typography>
            {/* Color: succes, warning, error  */}
            {/* TODO: Do a date comparison check with current date + color accordingly */}
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Chip color="error" label={task.targetDate}/>
              <Avatar sx={{ width: 36, height: 36, ml: 1 }}>
                {task.assignee ? getAssigneeFirstName(task.assignee).charAt(0) : null}
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