import React from 'react'
import { Outlet } from 'react-router-dom'

import ResponsiveAppBar from '../../components/appBar/ResponsiveAppBar'
import ResponsiveDrawer from '../../components/drawer/ResponsiveDrawer'
import { Main, DrawerHeader } from '../../components/CustomUI';

export default function Workspace({ drawerOpen, setDrawerOpen, drawerWidth, projects, users, workspaces, currentWorkspace, setCurrentWorkspace, currentUser, setCurrentProject }) {
  /* 
    Page component for rendering the Workspace page
  */

  return (
    <>
      <ResponsiveAppBar 
        drawerOpen={drawerOpen} 
        setDrawerOpen={setDrawerOpen} 
        drawerWidth={drawerWidth} 
        workspaces={workspaces}
        setCurrentWorkspace={setCurrentWorkspace}
        currentUser={currentUser}
      />
      <ResponsiveDrawer 
        drawerOpen={drawerOpen} 
        setDrawerOpen={setDrawerOpen} 
        drawerWidth={drawerWidth}
        projects={projects}
        users={users}
        workspaces={workspaces}
        currentWorkspace={currentWorkspace}
        setCurrentProject={setCurrentProject}
      />
      <Main open={drawerOpen}>
        <DrawerHeader />
        {/* Outlet will display child routes */}
        <Outlet />
      </Main>
    </>
  )
}
