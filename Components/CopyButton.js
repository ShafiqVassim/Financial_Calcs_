import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

const CopyButton = ({ text }) => {
  const buttonRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    const buttonContent = buttonRef.current.textContent;
    navigator.clipboard.writeText(buttonContent).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 500);
    });
  };

  return (
    <Button onClick={handleCopyToClipboard} ref={buttonRef} style={{ textAlign: "left", padding: "5px" }}>
      {isCopied ? (
        <>
          <span aria-label="Copied">
            <DoneAllOutlinedIcon style={{ fontSize: "1.2rem", marginRight: "2px" }} />
          </span>{" "}
          Copied
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default CopyButton;
