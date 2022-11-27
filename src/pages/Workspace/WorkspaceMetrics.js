import React from 'react'
import Box from '@mui/material/Box'
import { Button, FormGroup } from '@mui/material'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import AlertSnackbar from '../../components/AlertSnackbar'

export default function Metrics({ 
  projects, setCurrentProject, currentUser, currentWorkspace
}) {
  /* 
    Page component for rendering the Metrics page for Workspace
  */
  const [period, setPeriod] = React.useState('14')
  const [format, setFormat] = React.useState('json')
  const [state, setState] = React.useState({})
  const [selectedProjects, setSelectedProjects] = React.useState([])
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  React.useEffect(() => {
    setState(createStates(projects))
  }, [projects])

  React.useEffect(() => {
    setCurrentProject(null)
  })

  const createStates = (projects) => {
    let states = {}
    for (let i = 0 ; i < projects.length ; i++) {
      states[projects.project_id] = false
    }
    return states
  }

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value)
  }
  
  const handleProjectChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    })
    if (event.target.checked) {
      // add to the list of projects
      setSelectedProjects([
        ...selectedProjects,
        { project_id: event.target.value }
      ]);
    } else {
      // remove from list
      setSelectedProjects(
        selectedProjects.filter((project) => project.project_id !== event.target.value),
      );
    }
  }

  const handleFormatChange = (event) => {
    setFormat(event.target.value)
  }

  const handleSubmit = () => {
    let generateData = true

    const fetchData = async () => {
      let projectList = []
      for (let i = 0; i < selectedProjects.length; i++) {
        projectList.push(selectedProjects[i].project_id)
      }

      const data = { 
        projects: projectList,
        duration: parseInt(period),
        format: format
      }
      const url = process.env.REACT_APP_BACKEND_URL
      const userId = currentUser.user_id
      const endpoint = url + '/users/' + userId + '/workspaces/' + currentWorkspace + '/tasks/metrics'
      // POST /users/:user_id/workspaces/:workspace_id/tasks/metrics
      const response = await fetch( endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      let output = undefined
      let outputType = undefined
      if (format === 'json') {
        const jsonData = await response.json()
        output = JSON.stringify(jsonData)
        outputType = 'application/json'
      } else if (format === 'csv') {
        output = await response.text()
        outputType = 'text/csv'
      }
      if (generateData) {
        downloadOutput('kaizen-data', output, outputType)
        setSnackbarOpen(!snackbarOpen)
      }
    }

    fetchData()
    return () => {
      generateData = false
    }
  }

  return (
    <Box sx={{
      m: 2,
      flexsDirection: 'column',
    }}>
      <Typography variant="h4">
        Metrics
      </Typography>
      <Typography variant="subtitle1" sx={{ mt:1 }}>
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
            <FormControlLabel value="14" control={<Radio />} label="2 weeks" />
            <FormControlLabel value="30" control={<Radio />} label="1 month" />
            <FormControlLabel value="60" control={<Radio />} label="3 months" />
            <FormControlLabel value="90" control={<Radio />} label="6 months" />
            <FormControlLabel value="365" control={<Radio />} label="1 year" />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ m: 2 }}>
          <FormLabel id="radio-button-group" sx={{ marginY: 1 }}>Select Project(s)</FormLabel>
          <FormGroup>

          </FormGroup>
          {projects
          ? (projects.map((project) => (
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={state[project.project_id]} 
                    value={project.project_id}
                    onChange={handleProjectChange} 
                    name={project.project_name} 
                  />
                }
                label={project.project_name}
              />
            )))
          : null}
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
      <Button 
        variant='contained' 
        onClick={handleSubmit}
        disabled={projects.length < 1 || selectedProjects < 1}
        x={{ marginY: 2 }} >
          Generate data
      </Button>
      {projects.length < 1
      ? <Typography 
          variant="subtitle2" 
          sx={{mt: 1}} 
          color="primary"
        >
          Tip: Create a project and some tasks to generate data!
        </Typography>
      : null}
      {projects.length > 0 && selectedProjects.length < 1
      ? <Typography 
          variant="subtitle2" 
          sx={{mt: 1}} 
          color="primary"
        >
          Tip: Select at least one project to generate a data! 
          If the project doesn't have any task, file generated may be empty.
        </Typography>
      : null}
      <AlertSnackbar
        open={snackbarOpen} 
        setOpen={setSnackbarOpen} 
        severity={'success'}
        message={'Data has been generated!'}
      />
    </Box>
  )
}


// 
// Code adopted from:
// https://stackoverflow.com/questions/57709550/how-to-download-text-from-javascript-variable-on-all-browsers
// 
function downloadOutput(filename, text, type) {
  const a = document.createElement("a")
  a.style.display = "none"
  document.body.appendChild(a)

  a.href = window.URL.createObjectURL(
    new Blob([text], { type })
  )

  a.setAttribute("download", filename)
  a.click()

  window.URL.revokeObjectURL(a.href)
  document.body.removeChild(a)
}
