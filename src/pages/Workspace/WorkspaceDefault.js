import React from 'react'
import { Box, Typography } from '@mui/material'

/**
 * Renders the placeholder workspace content
 * 
 * @returns render()
 */
export default function WorkspaceDefault() {
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
