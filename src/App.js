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

function App(){
  const [drawerOpen, setDrawerOpen] = React.useState(true);
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
          element={<Workspace drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} drawerWidth={drawerWidth}/>}
        >
          <Route index element={<Default />} />
          <Route path="metrics" element={<Metrics/>}/>
          <Route path="settings" element={<WorkspaceSettings/>}/>
          {/* <Route path="*" element={<Default />} /> */}
        </Route>
        <Route path='/profile' element={<Profile drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} drawerWidth={drawerWidth}/>}/>
        <Route path='/settings' element={<GeneralSettings drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} drawerWidth={drawerWidth}/>}/>
        <Route path='/help' element={<Help drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} drawerWidth={drawerWidth}/>}/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
