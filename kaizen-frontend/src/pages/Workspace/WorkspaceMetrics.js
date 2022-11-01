import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Metrics() {
  /* 
    Page component for rendering the Metrics page for Workspace
  */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [checked, setChecked] = React.useState([true, false]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };  

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 6 }}>
      <FormControlLabel
        label="Project 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Project 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  return (
    <Box sx={{
      m: 2,
      flexsDirection: 'column',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h4">
          Metrics
        </Typography>
        <Tooltip title="Open workspaces">
          <Button
            id="basic-button"
            variant="contained"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            // sx={{ my: 2 }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Select project(s)
          </Button>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{
            mt: 1,
            paddingX: 100
          }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        >
          <FormControlLabel
            label="All project(s)"
            sx={{paddingX: 2}}
            control={
              <Checkbox
                checked={checked[0] && checked[1]}
                indeterminate={checked[0] !== checked[1]}
                onChange={handleChange1}
              />
            }
          />
          {children}
        </Menu>
      </Box>
      <Typography variant="h5" sx={{ mt: 4 }}>
        Burn-down Chart
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Team Velocity
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Individual Velocity
      </Typography>
    </Box>
  );
}

export default Metrics;