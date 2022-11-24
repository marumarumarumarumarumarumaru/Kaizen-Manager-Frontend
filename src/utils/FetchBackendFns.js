// Dummy data
// import projectsJson from "../data/projects"
// import workspacesJson from "../data/workspaces"
// import tasksJson from "../data/dummyTasks.json"
// import usersJson from '../data/users.json'

// export const loadWorkspaces = () => {
//   return { success: true, data: workspacesJson }
// }

export async function loadWorkspaces(currentUser) {
  const url = process.env.REACT_APP_BACKEND_URL
  const userId = currentUser.user_id
  const endpoint = url + '/users/' + userId + '/workspaces'
  
  const response = await fetch(endpoint, {method: 'GET'})
  return response
  // fetch( endpoint, {
  //   method: 'GET'
  // })
  //   .then(response => response.json())
  //     .then((data) => {
  //       console.log(data)
  //       return { success: true, data: workspacesJson }
  //       // return { success: true, data: data }
  //     })
  //       .catch(error => {
  //         console.log(error)
  //         return { success: false }
  //       });
}

// export const loadProjects = () => {
//   return { success: true, data: projectsJson }
// }

export const loadProjects = (currentWorkspace, currentUser) => {
  const url = process.env.REACT_APP_BACKEND_URL
  const userId = currentUser.user_id
  const endpoint = url + '/users/' + userId + '/workspaces/' + currentWorkspace + '/projects'
  fetch( endpoint, {
    method: 'GET'
  })
    .then(response => response.json())
      .then((data) => {
        console.log(data)
        // return { success: true, data: projectsJson }
        return { success: true, data: data }
      })
        .catch(error => {
          console.log(error)
          return { success: false }
        });
}

// export const loadTasks = () => {
//   return { success: true, data: tasksJson }
// }

export const loadTasks = (currentWorkspace, currentProject, currentUser) => {
  const url = process.env.REACT_APP_BACKEND_URL
  const userId = currentUser.user_id
  const endpoint = url + '/users/' + userId + '/workspaces/' + currentWorkspace + '/projects/' + currentProject + '/tasks'
  fetch( endpoint, {
    method: 'GET'
  })
    .then(response => response.json())
      .then((data) => {
        console.log(data)
        // return { success: true, data: tasksJson }
        return { success: true, data: data }
      })
        .catch(error => {
          console.log(error)
          return { success: false }
        });
}

// export const loadUsers = () => {
//   return { success: true, data: usersJson }  
// }

export const loadUsers = (currentWorkspace, currentUser) => {
  const url = process.env.REACT_APP_BACKEND_URL
  const userId = currentUser.user_id
  const endpoint = url + '/users/' + userId + '/workspaces/' + currentWorkspace + '/users'
  fetch( endpoint, {
    method: 'GET'
  })
    .then(response => response.json())
      .then((data) => {
        console.log(data)
        // return { success: true, data: usersJson }  
        return { success: true, data: data }
      })
        .catch(error => {
          console.log(error)
          return { success: false }
        });
}