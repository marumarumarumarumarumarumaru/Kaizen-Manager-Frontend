import React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import DeleteWorkspaceDialog from '../../components/dialogs/DeleteWorkspaceDialog';
import MembersTable from './WSMembersTable';
import AddMemberDialog from '../../components/dialogs/AddMemberDialog';

export default function WorkspaceSettings({ workspaces, users, currentWorkspace }) {
  /* 
    Page component for rendering the Settings page for Workspace
  */
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [addMemberOpen, setAddMemberOpen] = React.useState(false);

  const handleDeleteWSClickOpen = () => {
    setDeleteOpen(!deleteOpen);
  };

  const handleAddMemberOpen = () => {
    setAddMemberOpen(!addMemberOpen);
  }

  const getWorkspaceName = (workspaces, currentWorkspace) => {
    let workspaceName = '';

    for (let i = 0; i < workspaces.length; i++) {
      if (workspaces[i].workspace_id === currentWorkspace) {
        workspaceName = workspaces[i].workspace_name
      }
    } 
    return workspaceName;
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
        <MembersTable users={users}/>
        <Button variant='contained' onClick={handleAddMemberOpen}>Add a member</Button>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Delete Workspace
        </Typography>
        <Typography variant="caption">
          If you delete a workspace, the tasks and projects under this workpsace will be deleted!
        </Typography>
      </Box>
      <Button variant='contained' onClick={handleDeleteWSClickOpen} sx={{ml: 2}} color="error">Delete Workspace</Button>
      <DeleteWorkspaceDialog 
        open={deleteOpen} 
        setOpen={setDeleteOpen} 
        workspaceName={getWorkspaceName(workspaces, currentWorkspace)}/>
      <AddMemberDialog 
        open={addMemberOpen} 
        setOpen={setAddMemberOpen} 
        currentWorkspace={currentWorkspace}
        workspaceName={getWorkspaceName(workspaces, currentWorkspace)}/>
    </>
  );
}
