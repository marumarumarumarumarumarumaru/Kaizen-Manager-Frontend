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

function CreateAccount() {
  /* 
    Page component for rendering the CreateAccount page
  */

  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    passwordMatch: '',
    showPassword: false,
    showPasswordMatch: false,
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

  const handleClickShowPasswordMatch = () => {
    setValues({
      ...values,
      showPasswordMatch: !values.showPasswordMatch,
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
            <Typography variant='h4'>Create an Account</Typography>
            <Typography paragraph sx={{ textAlign: 'center' }}>
              Fill in the form below to create an account.<br/>
              Press "Create" once ready.
            </Typography>
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
              label="Name"
              onChange={handleChange('name')}
              sx={{ m: 1, width: '30vh' }}
            />
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
            <FormControl sx={{ m: 1, width: '30vh' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password * (type again)</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPasswordMatch ? 'text' : 'password'}
                value={values.passwordMatch}
                onChange={handleChange('passwordMatch')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordMatch}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPasswordMatch ? <VisibilityOff /> : <Visibility />}
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
              <Button variant='contained' sx={{ m: 2, paddingY: 1, paddingX: 2 }}>Back</Button>
            </Link>
            <Link
              to='/login'
            >
              <Button variant='contained' sx={{ m: 2, paddingY: 1, paddingX: 2 }}>Create</Button>
            </Link>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default CreateAccount;