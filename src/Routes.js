import React from "react";
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

// Entrypoints
import Base from "./pages/Base";
import CreateAccount from "./pages/CreateAccount";
import Landing from './pages/Landing';
import Login from './pages/Login';

// Workspace
import Metrics from "./pages/workspace/WorkspaceMetrics";
import WorkspaceDefault from "./pages/workspace/WorkspaceDefault";
import Workspace from './pages/workspace/Workspace';
import Workspaces from './pages/workspace/Workspaces';
import WorkspaceSettings from "./pages/workspace/WorkspaceSettings";

// User Options
import GeneralSettings from "./pages/general/GeneralSettings";
import Help from "./pages/general/Help";
import Profile from "./pages/general/Profile";

import Projects from "./pages/projects/Projects";
import Project from "./pages/projects/Project";

function MyRoutes({ drawerOpen, setDrawerOpen, currentWorkspace, setCurrentWorkspace, currentUser, workspaces, projects, tasks, users, drawerWidth}) {
  const [currLocation, setCurrLocation] = React.useState('/');
  const location = useLocation();

  React.useEffect(() => {
    setCurrLocation(location.pathname);
    // console.log(currLocation);
  }, [location, currLocation]);

  return (
    <Routes>
      <Route exact path="/" element={<Base location={currLocation} />}>
        <Route index element={<Landing />} />
        <Route 
          path="login" 
          element={<Login 
            currentWorkspace={currentWorkspace}/>}/>
        <Route 
          path="create-account" 
          element={<CreateAccount/>}/>
        <Route 
          path='profile' 
          element={<Profile 
            drawerOpen={drawerOpen} 
            setDrawerOpen={setDrawerOpen} 
            drawerWidth={drawerWidth} 
            projects={projects} 
            workspaces={workspaces} 
            currentWorkspace={currentWorkspace} 
            setCurrentWorkspace={setCurrentWorkspace}
            currentUser={currentUser}/>}/>
        <Route 
          path='settings' 
          element={<GeneralSettings 
            drawerOpen={drawerOpen} 
            setDrawerOpen={setDrawerOpen} 
            drawerWidth={drawerWidth} 
            projects={projects} 
            workspaces={workspaces} 
            currentWorkspace={currentWorkspace} 
            setCurrentWorkspace={setCurrentWorkspace}
            currentUser={currentUser}/>}/>
        <Route 
          path='help' 
          element={<Help 
            drawerOpen={drawerOpen} 
            setDrawerOpen={setDrawerOpen} 
            drawerWidth={drawerWidth} 
            projects={projects} 
            workspaces={workspaces} 
            currentWorkspace={currentWorkspace} 
            setCurrentWorkspace={setCurrentWorkspace}
            currentUser={currentUser}/>}/>
      </Route>
      <Route path='/workspaces' element={<Workspaces />}>
        <Route 
          path=":workspaceId" 
          element={<Workspace 
            drawerOpen={drawerOpen} 
            setDrawerOpen={setDrawerOpen} 
            drawerWidth={drawerWidth} 
            projects={projects} 
            workspaces={workspaces} 
            currentWorkspace={currentWorkspace} 
            setCurrentWorkspace={setCurrentWorkspace}
            currentUser={currentUser}/>}>
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
                tasks={tasks} 
                users={users}/>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default MyRoutes;
