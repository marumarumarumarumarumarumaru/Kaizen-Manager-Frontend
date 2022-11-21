import * as React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import ClearIcon from '@mui/icons-material/Clear'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { IconButton } from '@mui/material'
import AlertSnackbar from '../../components/AlertSnackbar'
import RemoveMemberDialog from '../../components/dialogs/RemoveMemberDialog'

export default function MembersRow({ user }) {

  const [role, setRole] = React.useState(user.role)
  const roles = ['Owner', 'PM', 'Member']
  const [removeUserOpen, setRemoveUserOpen] = React.useState(false)
  const [roleSnackbarOpen, setRoleSnackbarOpen] = React.useState(false)
  const fullName = user.first_name + ' ' + user.last_name
  // const [errors, setErrors] = React.useState([])

  const handleChange = (event) => {
    setRole(event.target.value)
    setRoleSnackbarOpen(!roleSnackbarOpen)
    // Update database as well
  }

  const handleRemoveUserClickOpen = () => {
    setRemoveUserOpen(!removeUserOpen)
  }

  return (
    <>
      <TableRow
        key={user.user_id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {fullName}
        </TableCell>
        <TableCell align="right">
          <FormControl>
            <Select
              id="update-role-select-standard"
              value={role}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {roles.map((role) => (
                <MenuItem value={role}>{role}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleRemoveUserClickOpen}>
            <ClearIcon/>
          </IconButton>
        </TableCell>
      </TableRow>    
      <RemoveMemberDialog 
        user={user}
        removeUserOpen={removeUserOpen}
        setRemoveUserOpen={setRemoveUserOpen}
      />
      <AlertSnackbar 
        open={roleSnackbarOpen} 
        setOpen={setRoleSnackbarOpen} 
        severity={'success'}
        message={ fullName + "'s role has been updated to: " + role }
      />
    </>
  )
}