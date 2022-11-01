import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function WorkspaceSettings() {
  /* 
    Page component for rendering the Settings page for Workspace
  */

  return (
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
      <Typography variant="h5" sx={{ mt: 2 }}>
        Delete Workspace
      </Typography>
      <Typography variant="caption">
        If you delete a workspace, the tasks and projects under this workpsace will be deleted!
      </Typography>
    </Box>
  );
}

export default WorkspaceSettings;