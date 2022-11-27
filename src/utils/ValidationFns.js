export function validateWorkspace(workspaceName) { 
  const errors = []

  if (workspaceName === '') {
    errors.push('Workspace name empty')
  }
  return errors
}

export function validateProject(projectName) { 
  const errors = []

  if (projectName === '') {
    errors.push('Project name empty')
  }
  return errors
}

export function validateTask(values) { 
  const errors = []

  if (values.taskName === '') {
    errors.push('Task name empty')
  }
  if (values.taskValue === null) {
    errors.push('Task value empty')
  }
  if (values.selectedStatus === null) {
    errors.push('Task status empty')
  }
  return errors
}

export function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email)
}

export function isEmpty(name) {
  return name === ''
}