import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Help({ setShowDrawer, setCurrentProject }) {
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
          Help
        </Typography>
        <Typography variant="caption">
          This is a help page. It'll list some information about Kaizen Manager.
        </Typography>
      </Box>
    </>
  )
}
