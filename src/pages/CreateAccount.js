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

function ValidateCreateUser(firstName, lastName, email) { 

  const errors = [];

  if (firstName === null) {
    errors.push("Missing first name");
  }
  if (lastName === null) {
    errors.push("Missing last name");
  }
  // TODO: Verify email further on the formatting
  if (email === null) {
    errors.push("Missing email");
  }

  return errors;
}

class CreateAccount extends React.Component {
  /* 
    Page component for rendering the Create Account page
  */

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordMatch: '',
      showPassword: false,
      showPasswordMatch: false,
      errors: []
    }
  }

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleClickShowPasswordMatch = () => {
    this.setState({
      showPasswordMatch: !this.state.showPasswordMatch,
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleSubmit = () => {
    let { firstName, lastName, email } = this.state;

    const errors = ValidateCreateUser(firstName, lastName, email)
    const hasErrors = errors.length > 0;
    if (hasErrors) { 
      this.setState({ errors });
      return;
    }
    const data = {
      first_name: firstName, 
      last_name: lastName, 
      email: email, 
    }

    // fetch( process.env.REACT_APP_BACKEND_URL + '/users' , {
    fetch( 'https://kaizen-manager-backend-service-account-35g22o4t5a-uc.a.run.app/users' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then ((response) => {
      console.log(response);
      if (response.ok)
        return response;
      else
        throw new Error("Something went wrong querying the database!");
    })
    .catch(error => {alert(error)});
  }
   
  render() {
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
                label="First Name"
                value={this.state.firstName}
                onChange={e => this.setState({ firstName: e.target.value })}
                sx={{ m: 1, width: '30vh' }}
              />
              <TextField
                required
                id="outlined-required"
                label="Last Name"
                value={this.state.lastName}
                onChange={e => this.setState({ lastName: e.target.value })}
                sx={{ m: 1, width: '30vh' }}
              />
              <TextField
                required
                id="outlined-required"
                label="Email"
                type="email"
                value={this.state.value}
                onChange={e => this.setState({ email: e.target.value })}
                sx={{ m: 1, width: '30vh' }}
              />
              <FormControl sx={{ m: 1, width: '30vh' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                        edge="end"
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
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
                  type={this.state.showPasswordMatch ? 'text' : 'password'}
                  value={this.state.passwordMatch}
                  onChange={e => this.setState({ passwordMatch: e.target.value })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPasswordMatch}
                        onMouseDown={this.handleMouseDownPassword}
                        edge="end"
                      >
                        {this.state.showPasswordMatch ? <VisibilityOff /> : <Visibility />}
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
                <Button onClick={this.handleSubmit} variant='contained' sx={{ m: 2, paddingY: 1, paddingX: 2 }}>Create</Button>
              </Link>
            </Box>
          </Paper>
        </Box>
      </>
    ); 
  }
}

export default CreateAccount;