import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Workspace({ 
  setShowDrawer, currentUser, currentWorkspace, handleProjectsUpdate, handleUsersUpdate 
}) {
  /* 
    Page component for outletting the workspace for specific workspace id
  */
  React.useEffect(() => {
    setShowDrawer(true)
  })

  React.useEffect(() => {
    let retrieveData = true
  
    const fetchData = async () => {
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const currWorkspaceUrl = url + '/users/' + userId + '/workspaces/' + currentWorkspace
      
      const getProjects = await fetch(currWorkspaceUrl + '/projects', {method: 'GET'})
      const projects = await getProjects.json()
      const getUsers = await fetch(currWorkspaceUrl + '/users', {method: 'GET'})
      const users = await getUsers.json()

      if (retrieveData) {
        handleProjectsUpdate(projects) 
        handleUsersUpdate(users)
      }
    }
  
    fetchData()
    return () => {
      retrieveData = false
    }
  }, [currentWorkspace])

  return (
    <>
      {/* Outlet will display child routes */}
      <Outlet />
    </>
  )
}
