import React, { useState } from "react";
import { Grid, Button } from "@mui/material";

const CalcButton = ({ onSubmit, onClear, onClose }) => {
  const [iconHovered, setIconHovered] = useState(false);
  const [iconHover, setIconHover] = useState(false);
  const [iconHovery, setIconHovery] = useState(false);


  return (
    // bottom:12, left: 40, if position is absolute
    <Grid item xs={12} style={{ position: "relative", width: "100%" }}>
      <Button
        type="submit"
        variant={iconHover ? "contained" : "outlined"}
        onMouseEnter={() => setIconHover(true)}
        onMouseLeave={() => setIconHover(false)}
        color="primary"
        style={{ padding: '5px' }}
      >
        Calculate
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={onClear}
        style={{ marginLeft: 6, padding: '5px' }}
      >
        Clear Inputs
      </Button>
      <Button
        variant={iconHovered ? "contained" : "outlined"}
        onMouseEnter={() => setIconHovered(true)}
        onMouseLeave={() => setIconHovered(false)} 
        color= "error"
        onClick={onClose}
        style={{ marginLeft: 6, padding: '5px' }}
      >
        Close
      </Button>
    </Grid>
  );
};

export default CalcButton;
