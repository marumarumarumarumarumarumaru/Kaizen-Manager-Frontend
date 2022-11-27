import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function WorkspaceDefault() {
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
        Tip: Try creating a project and creating tasks, or check out the workspace metrics page!
      </Typography>
    </Box>
  )
}
