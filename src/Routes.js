import React from "react"
import './App.css'
import { Route, Routes } from 'react-router-dom'

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

// Dummy data
import projectsJson from "./data/projects"
import workspacesJson from "./data/workspaces"
import tasksJson from "./data/dummyTasks.json"
import usersJson from './data/users.json'

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
  const [loggedIn, setLoggedIn] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      setDataLoaded(false)
      let getUser = await loadCurrentUser();
      if (getUser.success) {
        setCurrentUser(getUser.data)
      }
      let getUsers = await loadUsers();
      if (getUsers.success) {
        setUsers(getUsers.data) 
      }
      let getProjects = await loadProjects();
      if (getProjects.success) {
        setProjects(getProjects.data) 
      }
      let getTasks = await loadTasks();
      if (getTasks.success) {
        setTasks(getTasks.data) 
      }
      let getWorkspaces = await loadWorkspaces()
      if (getWorkspaces.success) {
        setWorkspaces(getWorkspaces.data) 
        setCurrentWorkspace(getWorkspaces.data[0].workspace_id)
      }
      if (getUser.success && getUsers.success && getProjects.success && getTasks.success && getWorkspaces.success) {
        setDataLoaded(true)
      }
    })()
  }, [])

  const loadCurrentUser = () => {
    // Currently using dummy data
    // setCurrentUser(usersJson[0])
    return { success: true, data: usersJson[0] }
    // fetch( process.env.REACT_APP_BACKEND_URL + '/users/' + 1, {
    //   method: 'GET'
    // })
    //   .then(response => response.json())
    //     .then((data) => {
    //       setCurrentUser(data)
    //     })
    //       .catch(error => {alert(error);});    
  }

  const loadUsers = () => {
    // Currently using dummy data
    // setUsers(usersJson) 
    return { success: true, data: usersJson }

    // fetch(tasksJson)
    // .then(response => response.json())
    // .then((json) => {
    //   this.setState({
    //     tasks: json.tasks
    //   })
    // })  
  }

  const loadWorkspaces = () => {
    // Currently using dummy data
    // 
    // setWorkspaces(workspacesJson)
    // setCurrentWorkspace(workspacesJson[0].workspace_id)
    return { success: true, data: workspacesJson }

    // Real Data
    //
    // fetch( process.env.REACT_APP_BACKEND_URL + '/users/' + 1 + '/workspaces', {
    //   method: 'GET'
    // })
    //   .then(response => response.json())
    //     .then((data) => {
    //       setWorkspaces(data)
    //       setCurrentWorkspace(data[0].workspace_id)
    //     })
    //       .catch(error => {alert(error);});
  }

  const loadProjects = () => {
    // Currently using dummy data
    // setProjects(projectsJson)
    return { success: true, data: projectsJson }

    // fetch(projectsJson)
    // .then(response => response.json())
    // .then((json) => {
    //   this.setState({
    //     projects: json.projects
    //   })
    // })  
  }

  const loadTasks = () => {
    // Currently using dummy data
    // setTasks(tasksJson)
    return { success: true, data: tasksJson }

    // fetch(tasksJson)
    // .then(response => response.json())
    // .then((json) => {
    //   this.setState({
    //     tasks: json.tasks
    //   })
    // })  
  }

  return (
    <Routes>
      <Route 
        exact 
        path="/" 
        element={<Base 
          dataLoaded={dataLoaded}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
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
        <Route index element={<Landing/>} />
        <Route path="redirect" 
          element={<Redirect currentWorkspace={currentWorkspace} setLoggedIn={setLoggedIn}/>}/>  
        <Route 
          path='profile' 
          element={<Profile setLoggedIn={setLoggedIn}/>}/>
        <Route 
          path='settings' 
          element={<GeneralSettings />}/>
        <Route 
          path='help' 
          element={<Help />}/> 
        {WorkspaceRoutes(tasks, projects, users, workspaces, currentWorkspace, currentProject)}
      </Route>  
    </Routes>
  )
}

function WorkspaceRoutes( tasks, projects, users, workspaces, currentWorkspace, currentProject ) {
  return (
    <Route 
      path='workspaces' 
      >
      <Route 
        path=":workspaceId" 
        element={<Workspace />}>      
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