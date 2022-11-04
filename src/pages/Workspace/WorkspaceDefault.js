import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Default() {
  /* 
    Page component for rendering the default message on Workspace page
  */

  return (
    <Box sx={{
      mt: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography paragraph>
        Select a project to get started
      </Typography>
    </Box>
  );
}

export default Default;