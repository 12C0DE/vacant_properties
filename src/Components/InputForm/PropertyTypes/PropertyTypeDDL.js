import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const PropertyTypeDDL = ({ updateList, register, errors }) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState();

  useEffect(() => {
    async function fetchData() {
      fetch("http://localhost:8888/.netlify/functions/getPropertyTypes")
        .then((response) => response.json())
        .then((data) => setPropertyTypes(data))
        .catch((error) => console.error(error));
    }

    fetchData();
  }, [updateList]);

  return (
    <FormControl className="w-1/2">
      <InputLabel id="propTypes">Property Types</InputLabel>
      <Select
        label="Property Type"
        defaultValue=""
        onChange={(e) => setSelectedPropertyType(e.target.value)}
        {...register("propertyType", { required: "Property Type is required" })}
        error={errors.propertyType}
        helperText={errors.propertyType && errors.propertyType.message}
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
