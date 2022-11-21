import React from 'react';
import Box from '@mui/material/Box';
import { Button, FormGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Metrics({ projects }) {
  /* 
    Page component for rendering the Metrics page for Workspace
  */
  const [period, setPeriod] = React.useState('2w');
  const [format, setFormat] = React.useState('json');
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    setState(createStates(projects));
  }, [projects]);

  const createStates = (projects) => {
    let states = {}
    for (let i = 0; i < projects.length; i++) {
      states[projects.project_id] = false
    }
    return states
  }

  const handleSubmit = () => {
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };
  
  const handleProjectChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  return (
    <Box sx={{
      m: 2,
      flexsDirection: 'column',
    }}>
      <Typography variant="h4">
        Metrics
      </Typography>
      <Typography variant="caption">
        Select a time period and projects you'd like to generate metrics data on.
      </Typography>
      <Box sx={{
      }}>
        <FormControl sx={{ m: 2 }}>
          <FormLabel id="time-period-radio-button-group" sx={{ marginY: 1 }}>Time Period</FormLabel>
          <RadioGroup
            aria-labelledby="time-period-radio-group"
            name="time-period-radio-buttons-group"
            value={period}
            onChange={handlePeriodChange}
          >
            <FormControlLabel value="2w" control={<Radio />} label="2 weeks" />
            <FormControlLabel value="1m" control={<Radio />} label="1 month" />
            <FormControlLabel value="3m" control={<Radio />} label="3 months" />
            <FormControlLabel value="6m" control={<Radio />} label="6 months" />
            <FormControlLabel value="1y" control={<Radio />} label="1 year" />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ m: 2 }}>
          <FormLabel id="radio-button-group" sx={{ marginY: 1 }}>Select Project(s)</FormLabel>
          <FormGroup>

          </FormGroup>
          {projects.map((project) => (
            <FormControlLabel
              control={
                <Checkbox checked={state[project.project_id]} onChange={handleProjectChange} name={project.project_name} />
              }
              label={project.project_name}
            />
          ))}
        </FormControl>
        <FormControl sx={{ m: 2 }}>
          <FormLabel id="data-format-radio-button-group" sx={{ marginY: 1 }}>Data Format</FormLabel>
          <RadioGroup
            aria-labelledby="data-format-radio-group"
            name="data-format-radio-buttons-group"
            value={format}
            onChange={handleFormatChange}
          >
            <FormControlLabel value="json" control={<Radio />} label="JSON" />
            <FormControlLabel value="csv" control={<Radio />} label="CSV" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Button variant='contained' onClick={handleSubmit} sx={{ marginY: 2 }} >Generate data</Button>
    </Box>
  );
}
