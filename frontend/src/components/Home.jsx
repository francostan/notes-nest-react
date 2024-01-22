import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Container,
} from "@mui/material";
import GreenButton from "./ui/buttons/greenButton";
import BlueButton from "./ui/buttons/blueButton";
import LoginIcon from "@mui/icons-material/Login";
import RegisterIcon from "@mui/icons-material/PersonAdd";
import { Note } from "@mui/icons-material";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const classes = {
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    background: "linear-gradient(5deg, #F5F5F5 20%, #E5E5E5 60%)",
    borderRadius: "1rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  cardContent: {
    textAlign: "center",
  },
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) navigate("/user");
    setLoading(false);
  }, [navigate]);

  return (
    <Container maxWidth="md" style={classes.container}>
      <Card variant="outlined" style={classes.card}>
        {loading ? (
          <Circles
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="circles-loading"
          />
        ) : (
          <CardContent sx={classes.cardContent}>
            <Note style={{ fontSize: "3rem" }} />
            <Typography variant="h3" gutterBottom>
              Welcome to NoteContainer
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Choose an option below
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <GreenButton
                    startIcon={<LoginIcon />}
                    text="Sign In"
                    routeToPush={"/login"}
                  />
                </Grid>
                <Grid item>
                  <BlueButton
                    startIcon={<RegisterIcon />}
                    text="Sign Up"
                    routeToPush={"/register"}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        )}
      </Card>
    </Container>
  );
};

export default Home;
