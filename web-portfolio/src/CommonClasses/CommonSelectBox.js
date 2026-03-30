import React from "react";
import { FormControl, Select, MenuItem, FormHelperText } from "@mui/material";

const CommonSelectBox = ({ options, placeholder, error, helperText, ...props }) => {
  return (
    <FormControl fullWidth error={error}>
      <Select
        {...props}
        displayEmpty
        sx={{
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          ...props.sx,
        }}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CommonSelectBox;
