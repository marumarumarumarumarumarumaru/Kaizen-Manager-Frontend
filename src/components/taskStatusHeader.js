import * as React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function StatusHeader({ status }) {
  return (
    <Paper elevation={24} key={status}>
      <Typography variant="h5" sx={{ m: 2, paddingY: 2 }}>{status}</Typography>
    </Paper>
  )
}