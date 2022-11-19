import React from "react";
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { amber } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

// Dummy data
import projectsJson from "./data/projects";
import workspacesJson from "./data/workspaces";
import tasksJson from "./data/dummyTasks.json";
import usersJson from './data/users.json';
import MyRoutes from "./Routes";

export default function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [currentWorkspace, setCurrentWorkspace] = React.useState(null);
  const [workspaces, setWorkspaces] = React.useState(null);
  const [projects, setProjects] = React.useState(null);
  const [tasks, setTasks] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const drawerWidth = 260;

  React.useEffect(() => {
    loadProjects();
    loadTasks();
    loadUsers();
    loadWorkspaces();
  }, []);

  const loadWorkspaces = () => {
    // Currently using dummy data
    setWorkspaces(workspacesJson)
    setCurrentWorkspace(workspacesJson[0].id)
    // fetch(workspacesJson)
    // .then(response => response.json())
    // .then((json) => {
    //   this.setState({
    //     workspaces: json.workspaces,
    //     currentWorkspace: json.workspaces[0].id
    //   })
    // })  
  }

  const loadProjects = () => {
    // Currently using dummy data
    setProjects(projectsJson)
    // fetch(projectsJson)
    // .then(response => response.json())
    // .then((json) => {
    //   this.setState({
    //     projects: json.projects
    //   })
    // })  
  }

  const loadTasks = () => {
    // Currently using dummy data
    setTasks(tasksJson);
    // fetch(tasksJson)
    // .then(response => response.json())
    // .then((json) => {
    //   this.setState({
    //     tasks: json.tasks
    //   })
    // })  
  }

  const loadUsers = () => {
    // Currently using dummy data + setting current user temporarily
    setUsers(usersJson); 
    setCurrentUser(usersJson[0])
    // fetch(tasksJson)
    // .then(response => response.json())
    // .then((json) => {
    //   this.setState({
    //     tasks: json.tasks
    //   })
    // })  
  }

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
  
  return (
    <ThemeProvider theme={createTheme(getDesignTokens('dark'))}>
      <CssBaseline />
      <MyRoutes 
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        currentWorkspace={currentWorkspace}
        setCurrentWorkspace={setCurrentWorkspace}
        currentUser={currentUser}
        workspaces={workspaces}
        projects={projects}
        tasks={tasks}
        users={users}
        drawerWidth={drawerWidth}
      />
    </ThemeProvider>
  );
}
