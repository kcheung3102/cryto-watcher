import React,{useState} from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const SignUp = () => {
    let navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors ] = useState({
      passError: '',
      confirmPassError: '',
      requiredEmail: '',
    })

    //first check if email is empty or valid...
    //check if password is not an empty string
    //check if confirm pass matches with password...

  //   const validateFields = () => {
  //     let error = false
  //     if (password && password.length < 5) {
  //         error = true
  //         console.log('password was too short');
  //         //notice updater function here
  //         setErrors(state=>({...state, short: 'Password must contain at least 5 characters'}))
  //         console.log('short set');
  //     }
  //     if (!confirmPassword && confirmPassword !== password) {
  //         error = true
  //         setErrors(state=>({...state, mismatch: "Passwords don't match"}))
  //     }

  //     console.log('Error:', error)
  //     return error
  // }

  // const validateEmail = () => {
  //   let error = false
  //   if(!email || email.length < 5) {
  //     error = true
  //     console.log('email is required');

  //     setErrors( state => ({
  //       ...state, requiredEmail: 'Email is required....'
  //     }))
  //   }
  //   return error
  // }

    const handleSignUp = (event) => {
        event.preventDefault(); 
        
        if(!email) {
          setErrors(state => ({
            ...state,
            requiredEmail: 'Email field is empty'
          }))
        }

        if(password.length < 6) {
          setErrors( state => ({
            ...state, passError: 'Password must be atleast 6 characters long.'
          }))
        }

        if(confirmPassword !== password) {
          setErrors( state => ({
            ...state, confirmPassError: 'Password mismatch...'
          }))
        }

          const data = new FormData(event.currentTarget);
          // eslint-disable-next-line no-console
          console.log(email, password);
        }

        // const authentication = getAuth(app);
        // createUserWithEmailAndPassword(authentication, email, password)
        // .then((response) => {
        //   console.log(response);
        //   const user = response.user;
        //   console.log(user);
        // });
    // }


  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          autoComplete="email"
          autoFocus
          error={!!errors.requiredEmail} 
          helperText={errors?.requiredEmail}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          error={!!errors.passError} 
          helperText={errors?.passError}
        />
         <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="confirm-password"
          error={!!errors.confirmPassError}
          helperText={errors?.confirmPassError}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor:'wheat' }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  </Container>
  )
};
