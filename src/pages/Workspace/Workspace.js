import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Workspace() {
  /* 
    Page component for outletting the workspace for specific workspace id
  */

  return (
    <>
      {/* Outlet will display child routes */}
      <Outlet />
    </>
  )
}
