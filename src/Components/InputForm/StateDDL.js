import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { stateList } from "./stateList";

export const StateDDL = ({ register, registerName }) => {
  const [selState, setSelState] = useState("KS");

  return (
    <FormControl>
      <InputLabel id="simple-select-label">State</InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        defaultValue={selState}
        value={selState}
        label="State"
        onChange={(e) => setSelState(e.target.value)}
        sx={{ width: 80, placeSelf: "end", marginBottom: "10px" }}
        {...register(registerName)}
      >
        {stateList.map((st, index) => (
          <MenuItem key={`sL${index}`} value={st}>
            {st}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
