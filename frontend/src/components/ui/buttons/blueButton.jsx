import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const BlueButton = ({ startIcon, text, routeToPush, type }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        style={{
          backgroundColor: "#1976D2",
          "&:hover": { backgroundColor: "#1565C0" },
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

export default BlueButton;
