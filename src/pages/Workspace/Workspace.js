import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Workspace({ setShowDrawer }) {
  /* 
    Page component for outletting the workspace for specific workspace id
  */
  React.useEffect(() => {
    setShowDrawer(true)
  })

  return (
    <>
      {/* Outlet will display child routes */}
      <Outlet />
    </>
  )
}
