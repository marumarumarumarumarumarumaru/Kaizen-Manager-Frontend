import React from "react";
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { amber } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

// Entrypoints
import CreateAccount from "./pages/CreateAccount";
import Landing from './pages/Landing';
import Login from './pages/Login';

// Workspace
import Metrics from "./pages/Workspace/WorkspaceMetrics";
import WorkspaceDefault from "./pages/Workspace/WorkspaceDefault";
import Workspace from './pages/Workspace/Workspace';
import Workspaces from './pages/Workspace/Workspaces';
import WorkspaceSettings from "./pages/Workspace/WorkspaceSettings";

// User Options
import GeneralSettings from "./pages/General/GeneralSettings";
import Help from "./pages/General/Help";
import Profile from "./pages/General/Profile";

import { Route, Routes } from 'react-router-dom';
import Projects from "./pages/Projects/Projects";
import Project from "./pages/Projects/Project";

// Dummy data
import projectsJson from "./data/projects";
import workspacesJson from "./data/workspaces";
import tasksJson from "./data/dummyTasks.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: true,
      currentWorkspace: null,
      drawerWidth: 260,
      workspaces: null,
      projects: null,
      tasks: null
    }
    this.setDrawerOpen = this.setDrawerOpen.bind(this);
    this.setCurrentWorkspace = this.setCurrentWorkspace.bind(this);
    this.getDesignTokens = this.getDesignTokens.bind(this);
  }

  componentDidMount() {
    this.loadProjects();
    this.loadWorkspaces();
    this.loadTasks();
  }

  setDrawerOpen() {
    this.setState(() => ({
      drawerOpen: !this.state.drawerOpen
    }));
  }

  setCurrentWorkspace = newCurrentWorkspace => {
    this.setState({
      currentWorkspace: newCurrentWorkspace
    });
  }

  loadWorkspaces() {
    // Currently using dummy data
    this.setState({
      workspaces: workspacesJson.workspaces,
      currentWorkspace: workspacesJson.workspaces[0].id
    })  
    // fetch(workspacesJson)
    // .then(response => response.json())
    // .then((json) => {
    //   this.setState({
    //     workspaces: json.workspaces,
    //     currentWorkspace: json.workspaces[0].id
    //   })
    // })  
  }

  loadProjects() {
    // Currently using dummy data
    this.setState({
      projects: projectsJson.projects
    })  
    // fetch(projectsJson)
    // .then(response => response.json())
    // .then((json) => {
    //   this.setState({
    //     projects: json.projects
    //   })
    // })  
  }

  loadTasks() {
    // Currently using dummy data
    this.setState({
      tasks: tasksJson.tasks
    })  
    // fetch(tasksJson)
    // .then(response => response.json())
    // .then((json) => {
    //   this.setState({
    //     tasks: json.tasks
    //   })
    // })  
  }


  getDesignTokens = mode => ({
    palette: {
      mode,
      primary: {
        ...amber,
        ...(mode === 'dark' && {
          main: amber[300],
        }),
      }
    },
  });
  
  render() {
    return (
      <ThemeProvider theme={createTheme(this.getDesignTokens('dark'))}>
        <CssBaseline />
        <Routes>
          <Route exact path="/">
            <Route index element={<Landing />} />
            <Route path="login" element={<Login currentWorkspace={this.state.currentWorkspace}/>}/>
            <Route path="create-account" element={<CreateAccount/>}/>
          </Route>
          <Route path='/workspaces' element={<Workspaces />}>
            <Route path=":workspaceId" element={<Workspace drawerOpen={this.state.drawerOpen} setDrawerOpen={this.setDrawerOpen} drawerWidth={this.state.drawerWidth} projects={this.state.projects} workspaces={this.state.workspaces} currentWorkspace={this.state.currentWorkspace} setCurrentWorkspace={this.setCurrentWorkspace}/>}>
              <Route index element={<WorkspaceDefault />} />
              <Route path="metrics" element={<Metrics projects={this.state.projects}/>}/>
              <Route path="settings" element={<WorkspaceSettings workspaces={this.state.workspaces} currentWorkspace={this.state.currentWorkspace}/>}/>
              <Route path="projects" element={<Projects/>}>
                <Route path=":projectId" element={<Project projects={this.state.projects} tasks={this.state.tasks}/>} />
              </Route>
            </Route>
          </Route>
          <Route 
            path='/profile' 
            element={<Profile drawerOpen={this.state.drawerOpen} setDrawerOpen={this.setDrawerOpen} drawerWidth={this.state.drawerWidth} projects={this.state.projects} workspaces={this.state.workspaces} currentWorkspace={this.state.currentWorkspace} setCurrentWorkspace={this.setCurrentWorkspace}/>}
          />
          <Route 
            path='/settings' 
            element={<GeneralSettings drawerOpen={this.state.drawerOpen} setDrawerOpen={this.setDrawerOpen} drawerWidth={this.state.drawerWidth} projects={this.state.projects} workspaces={this.state.workspaces} currentWorkspace={this.state.currentWorkspace} setCurrentWorkspace={this.setCurrentWorkspace}/>}
          />
          <Route 
            path='/help' 
            element={<Help drawerOpen={this.state.drawerOpen} setDrawerOpen={this.setDrawerOpen} drawerWidth={this.state.drawerWidth} projects={this.state.projects} workspaces={this.state.workspaces} currentWorkspace={this.state.currentWorkspace} setCurrentWorkspace={this.setCurrentWorkspace}/>}
          />
        </Routes>
      </ThemeProvider>
    );
  }
}

export default App;
