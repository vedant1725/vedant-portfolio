import React from "react";
import { Button } from "@mui/material";

const CommonButton = ({ children, variant = "contained", color = "primary", ...props }) => {
  return (
    <Button
      variant={variant}
      color={color}
      {...props}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        py: 1.5,
        px: 3,
        borderRadius: 2,
        boxShadow: variant === "contained" ? 2 : 0,
        "&:hover": {
          boxShadow: variant === "contained" ? 4 : 0,
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
