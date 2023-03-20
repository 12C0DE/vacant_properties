import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Modal, Button, Sheet } from "@mui/material";

const columns = {
  field: "propertyType",
  headerName: "Property Type",
};
export const PropertyType = () => {
  const [propTypeRows, setPropTypeRows] = useState();

  useEffect(() => {}, [propTypeRows]);
  return <Modal>{/* <DataGrid columns={columns} rows={} /> */}</Modal>;
};
