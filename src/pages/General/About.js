import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import GitHubIcon from '@mui/icons-material/GitHub'
import PersonIcon from '@mui/icons-material/Person'
import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

export default function About({ setShowDrawer, setCurrentProject }) {
  /* 
    Page component for rendering the Help page
  */
  React.useEffect(() => {
    setShowDrawer(true)
    setCurrentProject(null)
  })

  return (
    <>
      <Box sx={{
        m: 2,
        flexsDirection: 'column',
        alignItems: 'left'
      }}>
        <Typography variant="h4">
          About
        </Typography>
        <Typography variant="caption">
          Last updated: November 27, 2022
        </Typography>
        {RenderWhatIsSection()}
        <Divider sx={{ marginY: 3 }}/>
        {RenderHowItWorksSection()}
        <Divider sx={{ marginY: 3 }}/>
        {RenderRolesSection()}
        <Divider sx={{ marginY: 3 }}/>
        {RenderDeleteThingsSection()}
        <Divider sx={{ marginY: 3 }}/>
        {RenderFreedomSection()}
        <Divider sx={{ marginY: 3 }}/>
        {RenderFoundersSection()}
      </Box>
    </>
  )
}

function RenderWhatIsSection() {
  return(
    <>
    <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
      What Is Kaizen Manager?
    </Typography>
    <Typography>
      Kaizen Manager, Kaizen for short, is a lightweight project management tool 
      that gives teams the freedom to collaborate on their own terms.
    </Typography>
    </>
  )
}

function RenderHowItWorksSection() {
  return(
    <>
      <Typography variant="h5" sx={{ marginY: 1}}>
        How It Works
      </Typography>
      <Typography>
        Kaizen allows users to create workspaces and add other users to participate in the workspace. 
      </Typography>
      <Typography sx={{ mt: 2 }}>
        In the workspace, users with the proper role (more on that later) can create new projects. 
      </Typography>
      <Typography>
        Anyone who is a member of the workspace can then create tasks in a project 
        and assign the task to other members of the workspace.
      </Typography>
    </>
  )
}

function RenderRolesSection() {
  return(
    <>
      <Typography variant="h5" sx={{ marginY: 1}}>
        Roles
      </Typography>
      <Typography>
        As a member of a workspace, a user can have one of three roles: Owner, Project Manager (PM) or Member.
      </Typography>
      <Typography sx={{ mt: 2 }}>
        When a workspace is created, the user who created it is automatically designated as an owner of the workspace. 
      </Typography>
      <Typography>
        Otherwise, a user’s role is assigned or updated by an owner of the workspace.
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Permissions by Role
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <PersonIcon/>
          </ListItemIcon>
          <ListItemText 
            primary="Owner" 
            secondary={
              <React.Fragment>
                <Typography>Workspace - Update and Delete</Typography>
                <Typography>Project - Create, Update and Delete</Typography>
                <Typography>Task - Create, Update and Delete</Typography>
              </React.Fragment>
            }/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PersonIcon/>
          </ListItemIcon>
          <ListItemText 
            primary="PM (Project Manager)" 
            secondary={
              <React.Fragment>
                <Typography>Project - Create, Update and Delete</Typography>
                <Typography>Task - Create, Update and Delete</Typography>
              </React.Fragment>
            }/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PersonIcon/>
          </ListItemIcon>
          <ListItemText 
            primary="Member" 
            secondary={
              <React.Fragment>
                <Typography>Task - Create, Update and Delete</Typography>
              </React.Fragment>
            }/>
        </ListItem>
      </List>
    </>
  )
}

function RenderDeleteThingsSection() {
  return(
    <>
      <Typography variant="h5" sx={{ marginY: 1}}>
        Delete Things
      </Typography>
      <Typography>
        What happens when you delete a user’s account, a workspace or a project?
      </Typography>
      <Typography sx={{ mt: 2 }}>
        The simplest case is deleting a project. If there are any tasks associated with the project, they will be deleted along with the project. 
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Similarly, deleting a workspace will also delete all of the projects that belong to the workspace (and tasks by extension).
      </Typography>
      <Typography color="error" sx={{ mt: 2 }}>
        WARNING: When a user deletes their account, any workspace that does not have another user designated as an owner will also be deleted along with its projects and tasks. 
      </Typography>
      <Typography>
        If the workspace has more than one member besides the user and the user is the sole owner of the workspace, user will be instructed to assign at least one other owner in the workspace before deleting their account.
      </Typography>
    </>
  )
}

function RenderFreedomSection() {
  return(
    <>
      <Typography variant="h5" sx={{ marginY: 1}}>
        Freedom
      </Typography>
      <Typography>
        The description of Kaizen mentions that the tool gives teams the freedom to collaborate on their own terms. 
        Nice marketing, but what does actually that mean?
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Users have the option to export data about task completion so that they can create their own metrics - free of any opinion on how they should do so. 
        Kaizen allows users to designate a time frame for which they want task metrics. 
        The tool also allows users to select what format they want their data in. 
      </Typography>
      <Typography sx={{ mt: 2 }}>
        As of now, user’s have the option to export data in JSON or CSV formats.
      </Typography>
    </>
  )
}

function RenderFoundersSection() {
  return(
    <>
      <Typography variant="h5" sx={{ marginY: 1}}>
        Founders
      </Typography>
      <Typography>
        Kaizen Manager was started as a project by students of Oregon State University’s Computer Science Degree Program.
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <IconButton onClick={() => window.open('https://github.com/marumarumarumarumarumarumaru', '_blank')}>
              <GitHubIcon/>
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Marcos Castillo" secondary="Server and Backend Cloud Deployment "/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <IconButton onClick={() => window.open('https://github.com/gallacor', '_blank')}>
              <GitHubIcon/>
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Corey Gallagher" secondary="Database and Entity Modeling"/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <IconButton onClick={() => window.open('https://github.com/fusakoo', '_blank')}>
              <GitHubIcon/>
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Fusako Obata" secondary="UI/UX and Frontend Cloud Deployment"/>
        </ListItem>
      </List>
    </>
  )
}

