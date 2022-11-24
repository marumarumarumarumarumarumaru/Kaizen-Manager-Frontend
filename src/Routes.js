import React from "react"
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

// Entrypoints
import Base from "./pages/Base"
import Landing from './pages/Landing'
import Redirect from "./pages/Redirect"

// Workspace
import Metrics from "./pages/workspace/WorkspaceMetrics"
import WorkspaceDefault from "./pages/workspace/WorkspaceDefault"
import Workspace from './pages/workspace/Workspace'
import WorkspaceSettings from "./pages/workspace/WorkspaceSettings"

// User Options
import GeneralSettings from "./pages/general/GeneralSettings"
import Help from "./pages/general/Help"
import Profile from "./pages/general/Profile"

import Projects from "./pages/projects/Projects"
import Project from "./pages/projects/Project"

import CreateWorkspace from "./pages/CreateWorkspace"

export default function MyRoutes() {
  const [drawerOpen, setDrawerOpen] = React.useState(true)
  const [currentWorkspace, setCurrentWorkspace] = React.useState(null) // ID of workspace
  const [currentUser, setCurrentUser] = React.useState(null) // User entity
  const [currentProject, setCurrentProject] = React.useState(null) // ID of project
  const [workspaces, setWorkspaces] = React.useState(null)
  const [projects, setProjects] = React.useState(null)
  const [tasks, setTasks] = React.useState(null)
  const [users, setUsers] = React.useState(null)
  const [dataLoaded, setDataLoaded] = React.useState(false)
  const [showDrawer, setShowDrawer] = React.useState(false)
  const [navigateToRedirect, setNavigateToRedirect] = React.useState(false)

  // React.useEffect(() => {
  //   (async () => {
  //     setDataLoaded(false)
  //     let getUsers = await loadUsers();
  //     if (getUsers.success) {
  //       setUsers(getUsers.data) 
  //     }
  //     let getProjects = await loadProjects();
  //     if (getProjects.success) {
  //       setProjects(getProjects.data) 
  //     }
  //     let getTasks = await loadTasks();
  //     if (getTasks.success) {
  //       setTasks(getTasks.data) 
  //     }
  //     let getWorkspaces = await loadWorkspaces()
  //     if (getWorkspaces.success) {
  //       setWorkspaces(getWorkspaces.data) 
  //       setCurrentWorkspace(getWorkspaces.data[0].workspace_id)
  //     }
  //     if (getUsers.success && getProjects.success && getTasks.success && getWorkspaces.success) {
  //       setLoggedIn(true)
  //       setDataLoaded(true)
  //     }
  //   })()
  // }, [])

  function handleWorkspacesUpdate(data) {
    setWorkspaces(data)
  }
  function handleCurrentWorkspaceUpdate(data) {
    setCurrentWorkspace(data)
  }
  function handleUsersUpdate(data) {
    setUsers(data)
  }
  function handleProjectsUpdate(data) {
    setProjects(data)
  }
  function handleDataLoaded(bool) {
    setDataLoaded(bool)
  }

  return (
    <Routes>
      <Route 
        exact 
        path="/" 
        element={<Base 
          showDrawer={showDrawer}
          dataLoaded={dataLoaded}
          // loggedIn={loggedIn}
          // setLoggedIn={setLoggedIn}
          drawerOpen={drawerOpen} 
          setDrawerOpen={setDrawerOpen} 
          projects={projects} 
          users={users}
          workspaces={workspaces} 
          currentWorkspace={currentWorkspace} 
          setCurrentWorkspace={setCurrentWorkspace}
          currentUser={currentUser}
          setCurrentProject={setCurrentProject}
        />}>
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
            dataLoaded
            ? (workspaces.length > 0
              ? <Navigate replace to={'/workspaces/' + currentWorkspace}/>
              : <Navigate replace to='/create-workspace'/>
              )
            : <Redirect 
                setShowDrawer={setShowDrawer}
                currentUser={currentUser}
                currentWorkspace={currentWorkspace}
                handleWorkspacesUpdate={handleWorkspacesUpdate}
                handleCurrentWorkspaceUpdate={handleCurrentWorkspaceUpdate}
                handleDataLoaded={handleDataLoaded}
                />}/>  
        <Route 
          path='create-workspace' 
          element={<CreateWorkspace
            setShowDrawer={setShowDrawer}
            urrentWorkspace={currentWorkspace} 
            setCurrentWorkspace={setCurrentWorkspace}/>}/>
        <Route 
          path='profile' 
          element={<Profile 
            setShowDrawer={setShowDrawer}/>}/>
        <Route 
          path='settings' 
          element={<GeneralSettings 
            setShowDrawer={setShowDrawer}/>}/>
        <Route 
          path='help' 
          element={<Help />}/> 
        {WorkspaceRoutes(tasks, projects, users, workspaces, currentWorkspace, currentProject, setShowDrawer)}
      </Route>  
    </Routes>
  )
}

function WorkspaceRoutes( tasks, projects, users, workspaces, currentWorkspace, currentProject, setShowDrawer ) {
  return (
    <Route 
      path='workspaces' 
      >
      <Route 
        path=":workspaceId" 
        element={<Workspace 
          setShowDrawer={setShowDrawer}/>}>      
        <Route 
          index 
          element={<WorkspaceDefault />}/>
        <Route 
          path="metrics" 
          element={<Metrics projects={projects}/>}/>
        <Route 
          path="settings" 
          element={<WorkspaceSettings 
            workspaces={workspaces} 
            users={users}
            currentWorkspace={currentWorkspace}/>}/>
        <Route path="projects" element={<Projects/>}>
          <Route 
            path=":projectId" 
            element={<Project 
              projects={projects}
              currentProject={currentProject} 
              tasks={tasks} 
              users={users}/>} />
        </Route>
      </Route>
    </Route>
  )
}