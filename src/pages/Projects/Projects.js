import React from 'react';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

class Projects extends React.Component {  
  /* 
    Page component for rendering projects
  */ 

  componentDidMount() {
  }

  render() {
    return (
      <>
        <Box sx={{
          m: 2,
          flexsDirection: 'column',
        }}>
          <Outlet />
        </Box>
      </>
    );
  }
}

export default Projects;