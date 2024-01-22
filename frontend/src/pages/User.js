import React from 'react';
import UserHome from '../components/UserHome';
import { Container } from '@mui/material';


const classes = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
};


const Register = () => {
  return (
    <Container style={classes.container}>
      <UserHome />
    </Container>
  )
}

export default Register