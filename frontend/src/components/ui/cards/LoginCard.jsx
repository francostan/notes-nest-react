import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Container,
  Box,
  Avatar,
} from "@mui/material";
import { Email, Lock, Login } from "@mui/icons-material";
import BlueButton from "../buttons/blueButton";
import BackButton from "../buttons/comeBackButton";
import { Circles } from "react-loader-spinner";
import { supabase } from "../../../supabase/client";
import { useNavigate } from "react-router-dom";

const LoginCard = ({ classes }) => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailValid(false);
      setError("Email no válido");
      return;
    } else {
      setEmailValid(true);
    }
    setError("");

    setLoading(true);
    await fetchToLogin();
  };

  const fetchToLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (!data.session || !data.user || error) {
        setError("Email o contraseña incorrecta");
      } else if (data.session.access_token) {
        localStorage.setItem("token", data.session.access_token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={classes.cardContainer}>
      <Card style={classes.card}>
        <BackButton />
        <CardContent>
          <Box style={classes.centerText}>
            <Avatar style={classes.avatar}>
              <Lock />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              Sign in
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Access your account
            </Typography>
          </Box>
          {!emailValid && (
            <Typography style={classes.typographyError} color="error">
              Not valid Email
            </Typography>
          )}
          <form style={classes.form} onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailValid(true);
              }}
              InputProps={{
                startAdornment: <Email style={classes.iconMargin} />,
              }}
              style={{
                ...classes.textField,
                border: emailValid ? "" : "2px solid #ffcccc",
              }}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              InputProps={{
                startAdornment: <Lock style={classes.iconMargin} />,
              }}
              style={classes.textField}
            />
            <Box style={classes.buttonContainer}>
              <BlueButton
                startIcon={<Login />}
                text="Sign in"
                type="submit"
              />
            </Box>
            <Box style={classes.buttonContainer}>
              {error !== "" && emailValid ? (
                <Typography style={classes.typographyError} color="error">
                  {error}
                </Typography>
              ) : null}
              {loading && (
                <Circles
                  height="100"
                  width="100"
                  color="#1976D2"
                  ariaLabel="circles-loading"
                />
              )}
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginCard;
