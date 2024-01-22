import React from "react";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddNoteButton = ({ handleClick }) => (
  <Button
    variant="contained"
    style={{ backgroundColor: "#1976D2" }}
    onClick={handleClick}
    startIcon={<AddIcon />}
  >
    <Typography variant="button">New Note</Typography>
  </Button>
);

export default AddNoteButton;
