import React from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { IconButton, MenuItem, FormControl, Select, Paper } from '@mui/material'
import { Clear as ClearIcon } from '@mui/icons-material'

import AlertSnackbar from './AlertSnackbar'
import RemoveMemberDialog from './dialogs/RemoveMemberDialog'
import { checkUserRole } from '../utils/UserFns'

/**
 * Renders the Members Table
 * 
 * Parameters passed down from WorkspaceSettings
 * @param {array} users
 * @param {object} currentUser
 * @param {integer} currentWorkspace
 * @param {function} setUsers
 * 
 * @returns render()
 */
export default function MembersTable({ 
  users, currentUser, currentWorkspace, setUsers 
}) {
  const currentUserRole = checkUserRole(users, currentUser)

  return (
    <TableContainer component={Paper} sx={{ marginY: 2, maxWidth: 1000 }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Member name</TableCell>
            <TableCell align='right'>Role</TableCell>
            <TableCell align='right'>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <MembersRow 
              user={user} 
              currentUserRole={currentUserRole} 
              currentWorkspace={currentWorkspace}
              setUsers={setUsers}
              currentUser={currentUser}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

/**
 * Renders the Member Rows
 * 
 * Parameters passed down from WorkspaceTable
 * @param {object} user
 * @param {object} currentUser
 * @param {string} currentUserRole
 * @param {integer} currentWorkspace
 * @param {function} setUsers
 * 
 * @returns render()
 */
function MembersRow({ user, currentUserRole, currentUser, currentWorkspace, setUsers }) {

  const [role, setRole] = React.useState(user.user_role)
  const roles = ['member', 'pm', 'owner']
  const [removeUserOpen, setRemoveUserOpen] = React.useState(false)
  const [roleSnackbarOpen, setRoleSnackbarOpen] = React.useState(false)
  const fullName = user.first_name + ' ' + user.last_name
  // const [errors, setErrors] = React.useState([])

  const handleChange = (event) => {
    setRole(event.target.value)
    let updateMemberRole = true
    
    const updateMember = async () => {
      const url = process.env.REACT_APP_BACKEND_URL
  
      const userId = await user.user_id
      const currUserId = currentUser.user_id
      const usersEndpoint = url + '/users/' + currUserId + '/workspaces/' + currentWorkspace + '/users'
      const updateRoleEndpoint = usersEndpoint + '/' + userId
      const data = { user_role: event.target.value }
      // PATCH /users/:user_id/workspaces/:workspace_id/users/:user_id_to_be_updated
      await fetch( updateRoleEndpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      // GET /users/:user_id/workspaces/:worspace_id/users
      const usersResponse = await fetch( usersEndpoint, { method: 'GET'})
      const users = await usersResponse.json() 
      if (updateMemberRole) {
        setUsers(users)
        setRoleSnackbarOpen(!roleSnackbarOpen)
      }
    }

    updateMember()
    return () => {
      updateMemberRole = false
    }
  }

  const handleRemoveUserClickOpen = () => {
    setRemoveUserOpen(!removeUserOpen)
  }

  return (
    <React.Fragment>
      <TableRow
        key={user.user_id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='th' scope='row'>
          {fullName}
        </TableCell>
        <TableCell align='right'>
          <FormControl>
            <Select
              id='update-role-select-standard'
              value={role}
              onChange={handleChange}
              displayEmpty
              disabled={user.user_id === currentUser.user_id}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {roles.map((newRole) => (
                <MenuItem value={newRole}>{newRole.toUpperCase()}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
        <TableCell align='right'>
          <IconButton 
            onClick={handleRemoveUserClickOpen}
            disabled={currentUserRole !== 'owner' || user.user_id === currentUser.user_id}
            >
            <ClearIcon/>
          </IconButton>
        </TableCell>
      </TableRow>    
      <RemoveMemberDialog 
        user={user}
        currentUser={currentUser}
        currentWorkspace={currentWorkspace}
        setUsers={setUsers}
        removeUserOpen={removeUserOpen}
        setRemoveUserOpen={setRemoveUserOpen}
      />
      <AlertSnackbar 
        open={roleSnackbarOpen} 
        setOpen={setRoleSnackbarOpen} 
        severity={'success'}
        message={ fullName + '\'s role has been updated to: ' + role.toUpperCase() }
      />
    </React.Fragment>
  )
}