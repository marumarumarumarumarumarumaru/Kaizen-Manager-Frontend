import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Workspace() {
  /* 
    Page component for rendering the Main page
  */
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [memberOpen, setMemberOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMemberClick = () => {
    setMemberOpen(!memberOpen);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            }
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List
            sx={{ width: '100%' }}
            component="nav"
            aria-labelledby="workspace-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Workspace Name
              </ListSubheader>
            }
          >            
            <ListItemButton onClick={handleMemberClick}>
              <ListItemText primary='Members' />
              {memberOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={memberOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {['John Doe', 'Fusako Obata', 'Marcos Castillo', 'Corey Gallahar'].map((text, index) => (
                  <ListItem key={text}>
                    <ListItemAvatar>
                      <Avatar>{text.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemButton>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add a member" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton>
              <ListItemText primary='Settings' />
            </ListItemButton>
          </List>
          <Divider />
          <List
            sx={{ width: '100%' }}
            component="nav"
            aria-labelledby="views-subheader"
            subheader={
              <ListSubheader component="div" id="views-subheader">
                Views
              </ListSubheader>
            }
          >  
            <ListItemButton>
              <ListItemText primary='Metrics' />
            </ListItemButton>
          </List>
          <Divider />
          <List
            sx={{ width: '100%' }}
            component="nav"
            aria-labelledby="projects-subheader"
            subheader={
              <ListSubheader component="div" id="projects-subheader">
                Views
              </ListSubheader>
            }
          >  
            {['Test project', 'CS467', 'CS493'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
            enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
            Convallis convallis tellus id interdum velit laoreet id donec ultrices.
            Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
            nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
            leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
            feugiat vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
            sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
            eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
            neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
            tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
            sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
            tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
            et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
            tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
            eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
            posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>
        </Main>
      </Box>
      <footer>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ 
            mr: 2, ...(open && { display: 'none' }),
            ml: 2,
            mb: 2,
            position: 'fixed',
            bottom: 0,
            flexGrow: 1,
            justifyContent: "left",
            display: "flex",
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </footer>
    </>
  );
}

export default Workspace;