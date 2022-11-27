import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import PostAddIcon from '@mui/icons-material/PostAdd'

import CreateTaskDialog from './dialogs/CreateTaskDialog'

export default function CreateTaskCard({ 
  currentWorkspace, currentProject, currentUser, selectedStatus, users, setProjTasks
}) {
  const [newTaskOpen, setNewTaskOpen] = React.useState(false)

  const handleNewTaskClickOpen = () => {
    setNewTaskOpen(!newTaskOpen)
  }

  return (
    <React.Fragment>
      <Card sx={{ mb: 2 }} onClick={handleNewTaskClickOpen}>
        <CardActionArea>
          <CardContent>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <PostAddIcon/>
              <Typography gutterBottom variant='button' component='div' sx={{ ml: 2 }}>
                Create task
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <CreateTaskDialog 
        currentWorkspace={currentWorkspace}
        currentProject={currentProject}
        currentUser={currentUser}
        selectedStatus={selectedStatus} 
        users={users} 
        newTaskOpen={newTaskOpen} 
        setNewTaskOpen={setNewTaskOpen} 
        setProjTasks={setProjTasks}
      />
    </React.Fragment>
  )
}