import React from "react";
import './App.css';

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

import Projects from "./pages/Projects/Projects";
import Project from "./pages/Projects/Project";

import { Route, Routes } from 'react-router-dom';

class MyRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: this.props.drawerOpen,
      currentWorkspace: this.props.currentWorkspace,
      drawerWidth: this.props.drawerWidth,
      workspaces: this.props.workspaces,
      projects: this.props.projects,
      tasks: this.props.tasks,
      users: this.props.users
    }
    this.setDrawerOpen = this.setDrawerOpen.bind(this);
    this.setCurrentWorkspace = this.setCurrentWorkspace.bind(this);
    this.getDesignTokens = this.getDesignTokens.bind(this);
  }

  render() {
    return (
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
              <Route path=":projectId" element={<Project projects={this.state.projects} tasks={this.state.tasks} users={this.state.users}/>} />
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
    );
  }
}

export default MyRoutes;
