import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const PropertyTypeDDL = () => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState();

  useEffect(() => {
    fetch(".netlify/functions/getPropertyTypes")
      .then((response) => response.json())
      .then((data) => setPropertyTypes(data))
      .catch((error) => console.error(error));

    console.log(propertyTypes);
  }, []);

  return (
    <FormControl>
      <InputLabel id="propTypes">Property Types</InputLabel>
      <Select
        label="Property Type"
        onChange={(e) => setSelectedPropertyType(e.target.value)}
      >
        {propertyTypes.map((p, index) => (
          <MenuItem key={`pT${index}`}>{p}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
