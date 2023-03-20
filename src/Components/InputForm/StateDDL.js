import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { stateList } from "./stateList";
export const StateDDL = () => {
  const [selState, setSelState] = useState("KS");

  return (
    <FormControl className="w-full grow shrink">
      <InputLabel id="simple-select-label">State</InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        defaultValue={selState}
        value={selState}
        label="State"
        onChange={(e) => setSelState(e.target.value)}
      >
        {stateList.map((st) => (
          <MenuItem value={st}>{st}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
