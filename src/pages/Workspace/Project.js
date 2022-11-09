import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';

function Project({ projects }) {
  const { projectId } = useParams();

  const getProjectName = (projects, projectId) => {
    let projectName = '';

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === projectId) {
        projectName = projects[i].name
      }
    } 
    return projectName;
  }

  return (
    <>
      {/* <h2>Project: {projectId}</h2> */}
      <Typography variant="h4">
        {getProjectName(projects, projectId)}
      </Typography>
    </>
  );
};

export default Project;