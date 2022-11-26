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
import About from "./pages/general/About"
import Profile from "./pages/general/Profile"

import { checkUserRole } from "./utils/UserFns"

export default function MyRoutes() {
  const [drawerOpen, setDrawerOpen] = useLocalStorage('drawer-open', true)  // Controls responsive drawer
  const [showDrawer, setShowDrawer] = useLocalStorage('show-drawer', false)
  const [logout, setLogout] = useLocalStorage('logout', false)              // Controls logged in state
  const [navigateToRedirect, setNavigateToRedirect] = useLocalStorage('navigate-to-redirect', false)
  const [currentWorkspace, setCurrentWorkspace] = useLocalStorage('current-workspace', null) // ID of workspace
  const [currentProject, setCurrentProject] = useLocalStorage('current-project', null) // ID of project
  const [currentUser, setCurrentUser] = useLocalStorage('current-user', null) // User entity
  const [workspaces, setWorkspaces] = useLocalStorage('workspaces', null)
  const [projects, setProjects] = useLocalStorage('projects', null)
  const [users, setUsers] = useLocalStorage('users', null)
  const [workspacesLoaded, setWorkspacesLoaded] = useLocalStorage('workspaces-loaded', false)
  const [currentUserRole, setCurrentUserRole] = useLocalStorage('current-user-role', null)

  React.useEffect(() => {
    // localStorage.clear()
  }, [])

  React.useEffect(() => {
    let role = checkUserRole(users, currentUser)
    setCurrentUserRole(role)
    // eslint-disable-next-line
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
            setLogout={setLogout}
            setNavigateToRedirect={setNavigateToRedirect}
          />
        }>
        {EntryRoutes(
          setShowDrawer, navigateToRedirect, setNavigateToRedirect, currentUser, 
          setCurrentUser, currentWorkspace, setCurrentWorkspace, workspaces, setWorkspaces, 
          workspacesLoaded, setWorkspacesLoaded, logout, setLogout
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

// 
// Code adopted from:
// https://www.robinwieruch.de/react-uselocalstorage-hook/
// Robin Wieruch 
// Last accessed: November 26, 2022
// 
const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  );

  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

function EntryRoutes(
  setShowDrawer, navigateToRedirect, setNavigateToRedirect, currentUser, 
  setCurrentUser, currentWorkspace, setCurrentWorkspace, workspaces, setWorkspaces,
  workspacesLoaded, setWorkspacesLoaded, logout, setLogout
) {
  return(
    <>
      <Route 
        index 
        element={
          (navigateToRedirect && !logout)
          ? <Navigate replace to="redirect"/>
          : <Landing 
              setShowDrawer={setShowDrawer}
              setNavigateToRedirect={setNavigateToRedirect}
              setCurrentUser={setCurrentUser}
              setLogout={setLogout}
        />} 
      />
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
        />}
      />  
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
        path='about' 
        element={<About 
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
          />
        }>      
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