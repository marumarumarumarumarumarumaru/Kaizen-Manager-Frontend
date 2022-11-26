export function validateCreateWorkspace(workspaceName) { 
  const errors = []

  if (workspaceName === null) {
    errors.push("Workspace name empty")
  }
  return errors
}

export function validateCreateProject(projectName) { 
  const errors = []

  if (projectName === null) {
    errors.push("Project name empty")
  }
  return errors
}