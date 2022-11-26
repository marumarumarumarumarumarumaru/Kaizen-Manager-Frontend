export function ValidateCreateWorkspace(workspaceName) { 
  const errors = []

  if (workspaceName === null) {
    errors.push("Workspace name empty")
  }
  return errors
}