import React from "react";
import { Grid,MenuItem,TextField } from "@mui/material";

const InputField = ({ label, value, onChange, select   }) => {
  return (
    <Grid item xs={12} style={{marginBottom: "2.5rem"}}>
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type="number"
      step="0.01"
      variant="outlined"
      required
      margin="normal"
      fullWidth
      style={{marginBottom: "-30px"}}
     />
    </Grid>
  );
};

export default InputField;
