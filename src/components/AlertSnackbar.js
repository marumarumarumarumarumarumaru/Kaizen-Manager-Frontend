import React from 'react'
import { Snackbar, Alert as MuiAlert } from '@mui/material'

/**
 * Renders Alert Snackbar
 * 
 * @param {boolean} open      // Boolean controls visibility
 * @param {fuction} setOpen 
 * @param {string} severity
 * @param {string} message
 * 
 * @returns render()
 */
export default function AlertSnackbar({ open, setOpen, severity, message }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(!open)
  }

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

// Able to handle: error, warning, info, success
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})
