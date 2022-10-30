import React from "react";
import './App.css';
// import '@fontsource/roboto/400.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Workspace from './pages/Workspace';
// import Landing from './pages/Landing';

import { Route, Routes } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  } 


  render() {
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });

    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App">
          {/* <ResponsiveAppBar/> */}
          <main>
            <div>
              <Routes>
                <Route 
                  exact 
                  path='/' 
                  element={<Workspace/>}
                />
                {/* <Route 
                  exact 
                  path='/Landing' 
                  element={<Landing/>}
                /> */}
              </Routes>
            </div>
          </main>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
