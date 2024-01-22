"use client";
import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const GreenButton = ({ startIcon, text, routeToPush, type }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{
          backgroundColor: "#4CAF50",
          "&:hover": { backgroundColor: "#388E3C" },
        }}
        startIcon={startIcon}
        type={type ? type : "button"}
        onClick={() => {
          navigate(routeToPush);
        }}
      >
        {text}
      </Button>
    </div>
  );
};

export default GreenButton;
