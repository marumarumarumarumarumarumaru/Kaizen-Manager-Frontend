import React from 'react';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

export default function Workspaces() {  
  /* 
    Page component for rendering workspaces
  */ 

  return (
    <Box sx={{ display: 'flex' }}>
      <Outlet/>
    </Box>
  );
}
