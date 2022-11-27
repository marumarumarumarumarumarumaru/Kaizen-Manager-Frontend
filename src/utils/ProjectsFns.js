export const getProjectName = (projects, currentProject) => {
  let projectName = ''

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].project_id === currentProject) {
      projectName = projects[i].project_name
    }
  } 
  return projectName
}