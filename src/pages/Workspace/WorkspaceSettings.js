import React from 'react'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'

import MembersTable from '../../components/WSMembersTable'
import DeleteWorkspaceDialog from '../../components/dialogs/DeleteWorkspaceDialog'
import AddMemberDialog from '../../components/dialogs/AddMemberDialog'
import { CheckUserRole } from '../../utils/UserFns'

export default function WorkspaceSettings({
  workspaces, users, currentWorkspace, currentUser, setUsers
}) {
  /* 
    Page component for rendering the Settings page for Workspace
  */
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [addMemberOpen, setAddMemberOpen] = React.useState(false)
  const currentUserRole = CheckUserRole(users, currentUser)

  const handleDeleteWSClickOpen = () => {
    setDeleteOpen(!deleteOpen)
  }

  const handleAddMemberOpen = () => {
    setAddMemberOpen(!addMemberOpen)
  }

  const getWorkspaceName = (workspaces, currentWorkspace) => {
    let workspaceName = ''

    for (let i = 0; i < workspaces.length; i++) {
      if (workspaces[i].workspace_id === currentWorkspace) {
        workspaceName = workspaces[i].workspace_name
      }
    } 
    return workspaceName
  }

  return (
    <>
      <Box sx={{
        m: 2,
        flexsDirection: 'column',
      }}>
        <Typography variant="h4">
          Settings
        </Typography>
        <Typography variant="caption">
          Edit below to adjust this workspace's settings.
        </Typography>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Members
        </Typography>
        <Typography variant="caption">
          Adjust member's role, add a member, or delete a member from a workspace.
        </Typography>
        <MembersTable 
          users={users} 
          currentUser={currentUser}/>
        <Button 
          variant='contained' 
          disabled={currentUserRole !== 'owner'}
          onClick={handleAddMemberOpen}>
            Add a member
        </Button>
        {currentUserRole !== 'owner'
        ? <Typography variant="subtitle2" sx={{mt: 1}} color="error">You must be an owner to add a member</Typography>
        : null}
        <Typography variant="h5" sx={{ mt: 4 }}>
          Delete Workspace
        </Typography>
        <Typography variant="caption">
          If you delete a workspace, the tasks and projects under this workpsace will be deleted!
        </Typography>
      </Box>
      <Button 
        variant='contained' 
        onClick={handleDeleteWSClickOpen} 
        disabled={currentUserRole !== 'owner'}
        sx={{ml: 2}} 
        color="error">
          Delete Workspace
      </Button>
      {currentUserRole !== 'owner'
      ? <Typography variant="subtitle2" sx={{ml: 2, mt: 1}} color="error">You must be an owner to delete a workspace</Typography>
      : null}
      <DeleteWorkspaceDialog 
        open={deleteOpen} 
        setOpen={setDeleteOpen} 
        currentWorkspace={currentWorkspace}
        currentUser={currentUser}
        workspaceName={getWorkspaceName(workspaces, currentWorkspace)}/>
      <AddMemberDialog 
        open={addMemberOpen} 
        setOpen={setAddMemberOpen} 
        currentWorkspace={currentWorkspace}
        currentUser={currentUser}
        workspaceName={getWorkspaceName(workspaces, currentWorkspace)}
        setUsers={setUsers}/>
    </>
  )
}
