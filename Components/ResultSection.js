import React from "react";
import { TableHead, TableRow, TableCell, Typography } from "@mui/material";
import CopyButton from "./CopyButton";

const ResultSection = ({ title, CopyValue }) => {
  return (
    <TableHead>
      <TableRow align="center">
        <TableCell 
          sx={{
            paddingLeft: "100px", 
          }}
         align="">
          {title}
        </TableCell>
        <TableCell 
        sx={{
            paddingRight: "160px", 
          }}
           align="">
          <CopyButton text={CopyValue} />
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ResultSection;
