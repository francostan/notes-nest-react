import React from 'react'
import LoginCard from '../components/ui/cards/LoginCard';
import { Container } from '@mui/material';

const classes = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    width: 400,
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f5f5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  centerText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '32px',
  },
  avatar: {
    backgroundColor: '#1976D2',
    marginBottom: '16px',
  },
  textField: {
    marginBottom: '24px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  iconMargin: {
    marginRight: '8px',
  },

  typographyError: {
    marginBottom: "8px",
  }
};



export default function Login() {

  return (
    <Container style={classes.container}>
      <LoginCard classes={classes} />
    </Container>
  );
};