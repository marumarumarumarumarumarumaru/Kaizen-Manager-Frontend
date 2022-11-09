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
import Default from "./pages/Workspace/WorkspaceDefault";
import Workspace from './pages/Workspace/Workspace';
import WorkspaceSettings from "./pages/Workspace/WorkspaceSettings";

// User Options
import GeneralSettings from "./pages/General/GeneralSettings";
import Help from "./pages/General/Help";
import Profile from "./pages/General/Profile";

import { Route, Routes } from 'react-router-dom';
import Projects from "./pages/Workspace/Projects";
import Project from "./pages/Workspace/Project";

function App(){
  const projects = [
    { id: '1', name: 'Test Project' },
    { id: '2', name: 'CS467' },
    { id: '3', name: 'CS493' }
  ];
  // const workspaces = ['Workspace 1', 'Testing', 'Sleepless Night']

  const [drawerOpen, setDrawerOpen] = React.useState(true);
  // const [currentWorkspace, setCurrentWorkspace] = React.useState(workspaces[0]);
  const drawerWidth = 260;

  const getDesignTokens = (mode) => ({
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
  
  const darkModeTheme = createTheme(getDesignTokens('dark'));

  return (
    <ThemeProvider theme={darkModeTheme}>
      <CssBaseline />
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create-account' element={<CreateAccount/>}/>
        <Route  
          path='/workspace' 
          element={<Workspace drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} drawerWidth={drawerWidth} projects={projects} />}
        >
          <Route index element={<Default />} />
          <Route path="metrics" element={<Metrics/>}/>
          <Route path="settings" element={<WorkspaceSettings/>}/>
          <Route path="projects" element={<Projects/>}>
            <Route path=":projectId" element={<Project projects={projects}/>} />
          </Route>
          {/* <Route path="*" element={<Default />} /> */}
        </Route>
        <Route 
          path='/profile' 
          element={<Profile drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} drawerWidth={drawerWidth} projects={projects}/>}
        />
        <Route 
          path='/settings' 
          element={<GeneralSettings drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} drawerWidth={drawerWidth} projects={projects}/>}
        />
        <Route 
          path='/help' 
          element={<Help drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} drawerWidth={drawerWidth} projects={projects}/>}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
