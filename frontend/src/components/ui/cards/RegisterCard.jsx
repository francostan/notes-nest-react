import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Container,
  Box,
  Avatar,
  MenuItem,
} from "@mui/material";
import { Email, Lock, PersonAdd, Phone } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import BackButton from "../buttons/comeBackButton";
import { Circles } from "react-loader-spinner";
import GreenButton from "../buttons/greenButton";
import { countryCodes } from "../../../utils";
import { supabase } from "../../../supabase/client";

const classes = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto', 
    maxWidth: '500px',
    padding: '20px', 
  },
  card: {
    width: '100%',
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
    marginBottom: '12px',
  },
  avatar: {
    backgroundColor: '#1976D2',
    marginBottom: '8px',
  },
  textField: {
    marginBottom: '5px',
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


const RegisterCard = ({handleClose}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+54");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setError("");
  }, [email, phone]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      setError("Email no válido");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("La contraseña debe tener al menos 8 caracteres con una letra");
      return;
    }

    if (!phoneRegex.test(phone)) {
      setError("Número de teléfono no válido. Debe tener 10 dígitos");
      return;
    }
    setLoading(true);
    await fetchToRegister();
    setError("");
  };

  const fetchToRegister = async () => {
    try {

      const { data, error } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            data: {
              name,
              phone: countryCode + phone,
            },
            emailRedirectTo: 'http://localhost:3000/login',
          }
        }
      )

      console.log(data, error);
      
      if (data.user.aud === "authenticated") {
        enqueueSnackbar("Confirm email to complete registration", { variant: "info" });
        setEmail("");
        setPhone("");
        setPassword("");
        setName("");
      } else {
        setError("An error occurred while registering");
      }
    } catch (error) {
      setError("An error occurred while registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={classes.cardContainer}>
      <Card style={classes.card}>
        <BackButton handleClose={handleClose} />
        <CardContent>
          <Box style={classes.centerText}>
            <Avatar style={classes.avatar}>
              <Lock />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              Register
            </Typography>
          </Box>
          <form style={classes.form} onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Full name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={classes.textField}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <Email style={classes.iconMargin} />,
              }}
              style={classes.textField}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <Lock style={classes.iconMargin} />,
              }}
              style={classes.textField}
            />
            <Box display="flex" alignItems="center" style={classes.textField}>
              <TextField
                select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                variant="outlined"
                style={{ width: "30%" }}
              >
                {countryCodes.map((object, index) => (
                  <MenuItem key={index} value={object.value}>
                    {object.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Phone number"
                variant="outlined"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setPhone(value);
                }}
                InputProps={{
                  startAdornment: <Phone style={classes.iconMargin} />,
                }}
                style={{ width: "70%" }}
              />
            </Box>
            {error !== "" && (
              <Typography style={classes.typographyError} color="error">
                {error}
              </Typography>
            )}
            <Box style={classes.buttonContainer}>
              <GreenButton
                startIcon={<PersonAdd />}
                text="Register"
                type="submit"
              />
            </Box>
            {loading ? (
              <Box style={classes.buttonContainer}>
              <Circles
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="circles-loading"
        />
              </Box>
            ) : null}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterCard;
