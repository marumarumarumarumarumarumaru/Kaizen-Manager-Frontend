import React from "react"
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

// Entrypoints
import Base from "./pages/Base"
import Landing from './pages/Landing'
import Redirect from "./pages/Redirect"
import CreateWorkspace from "./pages/CreateWorkspace"
// Workspace
import Metrics from "./pages/workspace/WorkspaceMetrics"
import WorkspaceDefault from "./pages/workspace/WorkspaceDefault"
import Workspace from './pages/workspace/Workspace'
import WorkspaceSettings from "./pages/workspace/WorkspaceSettings"
// Projects
import Projects from "./pages/projects/Projects"
import Project from "./pages/projects/Project"
// User Options
import GeneralSettings from "./pages/general/GeneralSettings"
import Help from "./pages/general/Help"
import Profile from "./pages/general/Profile"

import { checkUserRole } from "./utils/UserFns"

export default function MyRoutes() {
  const [drawerOpen, setDrawerOpen] = React.useState(true)
  const [currentWorkspace, setCurrentWorkspace] = React.useState(null) // ID of workspace
  const [currentUser, setCurrentUser] = React.useState(null) // User entity
  const [currentProject, setCurrentProject] = React.useState(null) // ID of project
  const [workspaces, setWorkspaces] = React.useState(null)
  const [projects, setProjects] = React.useState(null)
  const [users, setUsers] = React.useState(null)
  const [workspacesLoaded, setWorkspacesLoaded] = React.useState(false)
  const [showDrawer, setShowDrawer] = React.useState(false)
  const [navigateToRedirect, setNavigateToRedirect] = React.useState(false)
  const [currentUserRole, setCurrentUserRole] = React.useState(checkUserRole(users, currentUser))

  React.useEffect(() => {
    setCurrentUserRole(checkUserRole(users, currentUser))
  }, [users, currentUser])

  return (
    <Routes>
      <Route 
        exact 
        path="/" 
        element={<Base 
          showDrawer={showDrawer}
          workspacesLoaded={workspacesLoaded}
          drawerOpen={drawerOpen} 
          setDrawerOpen={setDrawerOpen} 
          projects={projects} 
          users={users}
          workspaces={workspaces} 
          currentWorkspace={currentWorkspace} 
          setCurrentWorkspace={setCurrentWorkspace}
          currentUser={currentUser}
          currentUserRole={currentUserRole}
          currentProject={currentProject}
          setShowDrawer={setShowDrawer}
          setWorkspaces={setWorkspaces}
          setCurrentProject={setCurrentProject}
          setProjects={setProjects}
        />}>
        {EntryRoutes(
          setShowDrawer, navigateToRedirect, setNavigateToRedirect, currentUser, setCurrentUser,
          currentWorkspace, setCurrentWorkspace, workspaces, setWorkspaces, 
          workspacesLoaded, setWorkspacesLoaded
        )}
        {UserRoutes(
          setShowDrawer, setCurrentProject, setCurrentUser, currentUser
        )}
        {WorkspaceRoutes(
          projects, users, workspaces, currentUser, currentUserRole, currentWorkspace, 
          currentProject, setShowDrawer, setWorkspaces, setProjects, setUsers, 
          setCurrentWorkspace, setCurrentProject
        )}
      </Route>  
    </Routes>
  )
}

function EntryRoutes(
  setShowDrawer, navigateToRedirect, setNavigateToRedirect, currentUser, 
  setCurrentUser, currentWorkspace, setCurrentWorkspace, workspaces, setWorkspaces,
  workspacesLoaded, setWorkspacesLoaded
) {
  return(
    <>
      <Route 
        index 
        element={
          navigateToRedirect
          ? (<Navigate replace to="redirect"/>)
          : <Landing 
              setShowDrawer={setShowDrawer}
              setNavigateToRedirect={setNavigateToRedirect}
              currentUser={currentUser} 
              setCurrentUser={setCurrentUser}/>} />
      <Route 
        path="redirect" 
        element={
          workspacesLoaded
          ? (workspaces.length > 0
            ? <Navigate replace to={'/workspaces/' + currentWorkspace}/>
            : <Navigate replace to='/create-workspace'/>
            )
          : <Redirect 
              setShowDrawer={setShowDrawer}
              currentUser={currentUser}
              currentWorkspace={currentWorkspace}
              setWorkspaces={setWorkspaces}
              setCurrentWorkspace={setCurrentWorkspace}
              setWorkspacesLoaded={setWorkspacesLoaded}
              />}/>  
      <Route 
        path='create-workspace' 
        element={<CreateWorkspace
          setShowDrawer={setShowDrawer}
          currentUser={currentUser}
          setCurrentWorkspace={setCurrentWorkspace}
          setWorkspaces={setWorkspaces}
        />}
      />
    </>
  )
}

function UserRoutes( 
  setShowDrawer, setCurrentProject, setCurrentUser, currentUser
) {
  return(
    <>
      <Route 
        path='profile' 
        element={<Profile 
          setShowDrawer={setShowDrawer}
          setCurrentProject={setCurrentProject}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />}
      />
      <Route 
        path='settings' 
        element={<GeneralSettings 
          setShowDrawer={setShowDrawer}
          setCurrentProject={setCurrentProject}
        />}
      />
      <Route 
        path='help' 
        element={<Help 
          setShowDrawer={setShowDrawer}
          setCurrentProject={setCurrentProject}
        />}
      /> 
    </>
  )
}

function WorkspaceRoutes( 
  projects, users, workspaces, currentUser, currentUserRole, currentWorkspace, 
  currentProject, setShowDrawer, setWorkspaces, setProjects, setUsers, 
  setCurrentWorkspace, setCurrentProject
) {
  return (
    <Route 
      path='workspaces' 
      >
      <Route 
        path=":workspaceId" 
        element={<Workspace 
          setShowDrawer={setShowDrawer}
          currentUser={currentUser}
          currentWorkspace={currentWorkspace}
          setProjects={setProjects}
          setUsers={setUsers}
          />}
        >      
          <Route 
            index 
            element={<WorkspaceDefault />}/>
          <Route 
            path="metrics" 
            element={<Metrics 
              projects={projects}
              setCurrentProject={setCurrentProject}
            />}
          />
          <Route 
            path="settings" 
            element={<WorkspaceSettings 
              workspaces={workspaces} 
              users={users}
              currentWorkspace={currentWorkspace}
              currentUser={currentUser}
              setUsers={setUsers}
              setWorkspaces={setWorkspaces}
              setCurrentWorkspace={setCurrentWorkspace}
              setCurrentProject={setCurrentProject}
            />}
          />
          <Route path="projects" element={<Projects/>}>
            <Route 
              path=":projectId" 
              element={<Project 
                projects={projects}
                currentWorkspace={currentWorkspace}
                currentProject={currentProject} 
                currentUser={currentUser}
                currentUserRole={currentUserRole}
                users={users}
                setProjects={setProjects}
              />} 
            />
          </Route>
      </Route>
    </Route>
  )
}