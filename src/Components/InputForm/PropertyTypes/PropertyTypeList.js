import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Modal, Button } from "@mui/material";
import { Sheet } from "@mui/joy";

const columns = {
  field: "propertyType",
  headerName: "Property Type",
};
export const PropertyTypeList = ({ openModal, closeModal }) => {
  const [propTypeRows, setPropTypeRows] = useState();
  // const [modalOpen, setModalOpen] = useState(openModal);

  const rows = [
    {
      propType: "test1",
    },
    {
      propType: "test2",
    },
    {
      propType: "test3",
    },
    {
      propType: "test4",
    },
  ];

  const handleCloseModal = () => {
    closeModal(false);
  };

  useEffect(() => {}, [propTypeRows]);
  return (
    <Modal
      color="neutral"
      variant="soft"
      className="h-screen flex"
      open={openModal}
      onClose={handleCloseModal}
    >
      {/* <Modal open={modalOpen} onClose={() => setModalOpen(false)}> */}
      <Sheet className="m-auto">
        <DataGrid
          style={{ height: 400, width: "100%" }}
          rows={[
            {
              id: 1,
              name: "MUI",
              stars: 28000,
              default: "Open source",
            },
            {
              id: 2,
              name: "DataGridPro",
              stars: 15000,
              default: "Enterprise",
            },
          ]}
          columns={[
            { field: "default", width: 150 },
            { field: "name", width: 150 },
            { field: "stars", width: 150 },
          ]}
        />
        <p>Test</p>
        <Button />
      </Sheet>
    </Modal>
  );
};
