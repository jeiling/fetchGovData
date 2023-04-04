import {
  InputLabel,
  MenuItem,
  FormControl,
  Select as CoreSelect,
} from "@material-ui/core";
import React from "react";
import { SelectProps } from "./types";

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
}: SelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <CoreSelect value={value} onChange={(e) => onChange(e.target.value)}>
        {options?.map((ele: string) => (
          <MenuItem value={ele}>{ele}</MenuItem>
        ))}
      </CoreSelect>
    </FormControl>
  );
};
export default Select;
