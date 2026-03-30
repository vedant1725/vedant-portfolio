import React from "react";
import { TextField } from "@mui/material";

const CommonTextField = ({ error, helperText, ...props }) => {
  return (
    <TextField
      {...props}
      error={error}
      helperText={helperText}
      fullWidth
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          "&:hover fieldset": {
            borderColor: "primary.main",
          },
        },
        ...props.sx,
      }}
    />
  );
};

export default CommonTextField;
