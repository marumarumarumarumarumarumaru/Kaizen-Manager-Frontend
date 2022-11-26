export const getWorkspaceName = (workspaces, currentWorkspace) => {
  let workspaceName = ''

  for (let i = 0 ; i < workspaces.length ; i++) {
    if (workspaces[i].workspace_id === currentWorkspace) {
      workspaceName = workspaces[i].workspace_name
    }
  } 
  return workspaceName
}