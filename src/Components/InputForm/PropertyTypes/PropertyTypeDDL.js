import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const PropertyTypeDDL = () => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState();

  useEffect(() => {
    async function fetchData() {
      fetch("http://localhost:8888/.netlify/functions/getPropertyTypes")
        // fetch("https://vacantprops.netlify.app/.netlify/functions/getPropertyTypes")
        .then((response) => response.json())
        .then((data) => setPropertyTypes(data))
        .catch((error) => console.error(error));

      console.log(propertyTypes);
    }

    fetchData();
  }, []);

  return (
    <FormControl className="w-1/2">
      <InputLabel id="propTypes">Property Types</InputLabel>
      <Select
        label="Property Type"
        onChange={(e) => setSelectedPropertyType(e.target.value)}
      >
        {propertyTypes
          .sort((a, b) => a.type - b.type)
          .map((p, index) => (
            <MenuItem key={`pT${index}`} value={p.type}>
              {p.type}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
