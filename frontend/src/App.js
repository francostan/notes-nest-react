import "./App.css";
import { SnackbarProvider } from "notistack";
import React from "react";
import AppRouter from "./AppRouter";

const HomePage = () => {

  return (
    <SnackbarProvider>
      <AppRouter/>
      <footer>
        <p>© 2024 NoteContainer. Created by francostan.</p>
      </footer>
    </SnackbarProvider>
  );
};

export default HomePage;
