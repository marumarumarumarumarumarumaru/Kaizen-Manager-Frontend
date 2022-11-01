import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';


function ProfileForm() {
  /* 
    Page component for rendering the Main page
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
    <Box sx={{
      m: 2,
      flexsDirection: 'column'
    }}>
      <Typography variant="h4">
        Profile Settings
      </Typography>
      <Typography variant="caption">
        Edit below to adjust your profile settings on Kaizen Manager.
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingY: 2
        }}
      >
        <TextField
          id="outlined"
          label="Name"
          onChange={handleChange('name')}
          sx={{ m: 1, width: '50vh' }}
        />
        <TextField
          id="outlined"
          label="Email"
          type="email"
          onChange={handleChange('email')}
          sx={{ m: 1, width: '50vh' }}
        />
        <FormControl sx={{ m: 1, width: '50vh' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
        <FormControl sx={{ m: 1, width: '50vh' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password (type again)</InputLabel>
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
      <Button variant='contained'>Save</Button>
    </Box>
  );
}

export default ProfileForm;