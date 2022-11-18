import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SimpleAppBar from '../components/SimpleAppBar';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

export default function Login({ currentWorkspace }) {
  /* 
    Page component for rendering the Login page
  */

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <SimpleAppBar/>
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
        }}>
        <Paper
          elevation={12}
        >
          <Box sx={{
            marginTop: 5,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          >
            <Typography variant='h4'>Login</Typography>
            <Typography paragraph>Fill in and press "Login".</Typography>
          </Box>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingX: 10
            }}
          >
            <TextField
              required
              id="outlined-required"
              label="Email"
              type="email"
              onChange={handleChange('email')}
              sx={{ m: 1, width: '30vh' }}
            />
            <FormControl sx={{ m: 1, width: '30vh' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
          <Box sx={{
            marginBottom: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
            <Link
              to='/'
            >
              <Button 
                variant='contained' 
                sx={{ m: 2, paddingY: 1, paddingX: 2 }}
              >Back</Button>
            </Link>
            <Link
              to={'/workspaces/' + currentWorkspace}
            >
              <Button variant='contained' sx={{ m: 2, paddingY: 1, paddingX: 2 }}>Login</Button>
            </Link>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
