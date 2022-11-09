import React from 'react';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

function Projects() {  
  /* 
    Page component for rendering projects
  */ 

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

export default Projects;