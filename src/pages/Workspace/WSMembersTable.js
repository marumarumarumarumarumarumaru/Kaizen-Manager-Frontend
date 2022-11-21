import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import MembersRow from './WSMembersRow'

export default function MembersTable({ users }) {
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
            <MembersRow user={user}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}