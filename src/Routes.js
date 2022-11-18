import React from "react";
import './App.css';
import { Route, Routes } from 'react-router-dom';

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

function MyRoutes({ drawerOpen, setDrawerOpen, currentWorkspace, setCurrentWorkspace, workspaces, projects, tasks, users, drawerWidth}) {
  return (
    <Routes>
      <Route exact path="/">
        <Route 
          index 
          element={<Landing />} />
        <Route 
          path="login" 
          element={<Login 
            currentWorkspace={currentWorkspace}/>}/>
        <Route 
          path="create-account" 
          element={<CreateAccount/>}/>
      </Route>
      <Route 
        path='/workspaces' 
        element={<Workspaces />}>
        <Route 
          path=":workspaceId" 
          element={<Workspace 
            drawerOpen={drawerOpen} 
            setDrawerOpen={setDrawerOpen} 
            drawerWidth={drawerWidth} 
            projects={projects} 
            workspaces={workspaces} 
            currentWorkspace={currentWorkspace} 
            setCurrentWorkspace={setCurrentWorkspace}/>}>
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
              currentWorkspace={currentWorkspace}/>}/>
          <Route 
            path="projects" 
            element={<Projects/>}>
            <Route 
              path=":projectId" 
              element={<Project 
                projects={projects} 
                tasks={tasks} 
                users={users}/>} />
          </Route>
        </Route>
      </Route>
      <Route 
        path='/profile' 
        element={<Profile 
          drawerOpen={drawerOpen} 
          setDrawerOpen={setDrawerOpen} 
          drawerWidth={drawerWidth} 
          projects={projects} 
          workspaces={workspaces} 
          currentWorkspace={currentWorkspace} 
          setCurrentWorkspace={setCurrentWorkspace}/>}/>
      <Route 
        path='/settings' 
        element={<GeneralSettings 
          drawerOpen={drawerOpen} 
          setDrawerOpen={setDrawerOpen} 
          drawerWidth={drawerWidth} 
          projects={projects} 
          workspaces={workspaces} 
          currentWorkspace={currentWorkspace} 
          setCurrentWorkspace={setCurrentWorkspace}/>}/>
      <Route 
        path='/help' 
        element={<Help 
          drawerOpen={drawerOpen} 
          setDrawerOpen={setDrawerOpen} 
          drawerWidth={drawerWidth} 
          projects={projects} 
          workspaces={workspaces} 
          currentWorkspace={currentWorkspace} 
          setCurrentWorkspace={setCurrentWorkspace}/>}/>
    </Routes>
  );
}

export default MyRoutes;
