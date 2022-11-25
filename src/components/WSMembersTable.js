import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ClearIcon from '@mui/icons-material/Clear'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { IconButton } from '@mui/material'
import AlertSnackbar from './AlertSnackbar'
import RemoveMemberDialog from './dialogs/RemoveMemberDialog'

import { CheckUserRole } from '../utils/UserFns'

export default function MembersTable({ users, currentUser }) {
  const currentUserRole = CheckUserRole(users, currentUser)

  return (
    <TableContainer component={Paper} sx={{ marginY: 2, maxWidth: 1000 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Member name</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <MembersRow user={user} currentUserRole={currentUserRole}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function MembersRow({ user, currentUserRole }) {

  const [role, setRole] = React.useState(user.user_role)
  const roles = ['owner', 'pm', 'member']
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
                <MenuItem value={role}>{role.toUpperCase()}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
        <TableCell align="right">
          <IconButton 
            onClick={handleRemoveUserClickOpen}
            disabled={currentUserRole !== 'owner'}
            >
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