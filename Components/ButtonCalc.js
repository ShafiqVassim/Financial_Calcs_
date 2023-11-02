import React, { useState } from "react";
import {  Button, DialogActions } from "@mui/material";

const ButtonCalc = ({ onSubmit, onClose }) => {
  const [iconHovered, setIconHovered] = useState(false);
  const [iconHover, setIconHover] = useState(false);


  return (
    // bottom:12, left: 40, if position is absolute
    <DialogActions>
      <Button type="submit" 
        variant={iconHover ? "contained" : "outlined"}
        onMouseEnter={() => setIconHover(true)}
        onMouseLeave={() => setIconHover(false)} 
        color="primary">
        Calculate
      </Button>
      <Button
        variant={iconHovered ? "contained" : "outlined"}
        onMouseEnter={() => setIconHovered(true)}
        onMouseLeave={() => setIconHovered(false)} 
        color= "error"
        onClick={onClose}
      >
        Close
      </Button>
    </DialogActions>
  );
};

export default ButtonCalc;
