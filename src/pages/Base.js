import React from 'react';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
// import { styled } from '@mui/material/styles';

import SimpleAppBar from '../components/SimpleAppBar';
// import ResponsiveAppBar from '../components/ResponsiveAppBar';
// import ResponsiveDrawer from '../components/ResponsiveDrawer';

export default function Base({ location }) {  
  /* 
    Page component for rendering workspaces
  */ 
  const simplePages = ['/', '/login', '/create-account']

  React.useEffect(() => {
  }, []);

  return (
    <>
      {simplePages.includes(location) 
      ? 
        <>
          <SimpleAppBar />
          <Outlet />
        </>
      : 
        // TODO: Hoping to make this more robust to reduce redundancy in drawer/appbar
        <Box sx={{ display: 'flex' }}>
          <Outlet/>
        </Box>
      }
    </>
  );
}
