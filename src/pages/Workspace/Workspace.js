import React from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Renders the Workspace page
 * 
 * @param {function} setShowDrawer 
 * @param {object} currentUser 
 * @param {integer} currentWorkspace 
 * @param {function} setProjects 
 * @param {function} setUsers 
 * 
 * @returns render()
 */
export default function Workspace({ 
  setShowDrawer, currentUser, currentWorkspace, setProjects, setUsers 
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
        setProjects(projects) 
        setUsers(users)
      }
    }
  
    fetchData()
    return () => {
      retrieveData = false
    }
    // Disables the eslint complaining about the dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWorkspace])

  return (
    <React.Fragment>
      {/* Outlet will display child routes */}
      <Outlet />
    </React.Fragment>
  )
}
