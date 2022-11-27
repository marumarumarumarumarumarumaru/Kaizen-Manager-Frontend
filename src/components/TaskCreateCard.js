import React from 'react'
import { Box, Card, CardContent, CardActionArea, Typography } from '@mui/material'
import { PostAdd as PostAddIcon } from '@mui/icons-material'

import CreateTaskDialog from './dialogs/CreateTaskDialog'

/**
 * Renders Card for creating task
 * 
 * Parameters passed down from Project
 * @param {integer} currentWorkspace
 * @param {integer} currentProject
 * @param {object} currentUser
 * @param {string} selectedStatus
 * @param {array} users
 * @param {function} setProjTasks 
 * 
 * @returns render()
 */
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