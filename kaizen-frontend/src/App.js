import React from "react";
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Workspace from './pages/Workspace';
import Landing from './pages/Landing';

import { Route, Routes } from 'react-router-dom';

function App(){
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const drawerWidth = 260;

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route 
          exact 
          path='/' 
          element={
            <Landing/>
          }
        />
        <Route  
          path='/Workspace' 
          element={
            <Workspace drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} drawerWidth={drawerWidth}/>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
