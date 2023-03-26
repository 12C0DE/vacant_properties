import { useEffect, useState } from "react";
import { DataGrid, GridValidRowModel } from "@mui/x-data-grid";

import { Modal, Button } from "@mui/material";
import { Sheet } from "@mui/joy";
import uuid from "react-uuid";

export const PropertyTypeList = ({ openModal, closeModal }) => {
  const [propTypeRows, setPropTypeRows] = useState();

  const handleCloseModal = () => {
    closeModal(false);
  };

  const addNewRow = () => {
    const rowId = uuid();

    let updatedRows = [...propTypeRows];

    let newRow = {
      type: null,
      newID: rowId,
      isDirty: true,
    };

    updatedRows.push(newRow);
    updatedRows.slice();
    setPropTypeRows(updatedRows);
  };

  const processRowUpdate = (newRow, oldRow) => {
    const updatedRow_0 = { ...newRow, isDirty: true };

    if (newRow.type !== oldRow.type) {
      let currUpdatedRows = [...propTypeRows];

      if (newRow.hasOwnProperty("_id")) {
        const typeIndex = currUpdatedRows.findIndex(
          (n) => n._id === newRow._id
        );

        if (typeIndex > -1) {
          currUpdatedRows[typeIndex].type = newRow.type;
          currUpdatedRows[typeIndex].isDirty = true;

          setPropTypeRows(currUpdatedRows);
        }
      } else {
        //can be a newly added row that is being updated
        //multiple times
        let newIdIndex = currUpdatedRows.findIndex(
          (n) => n.newID === newRow.newID
        );

        if (newIdIndex > -1) {
          currUpdatedRows[newIdIndex].type = newRow.type;
          currUpdatedRows[newIdIndex].isDirty = true;

          setPropTypeRows(currUpdatedRows);
        } else {
          //create new object if the newID didn't exist before
          const updateRow = {
            type: newRow.type,
            newID: uuid(),
            isDirty: true,
          };

          setPropTypeRows([...currUpdatedRows, updateRow]);
        }
      }
    }

    return updatedRow_0;
  };

  useEffect(() => {
    async function fetchData() {
      fetch("http://localhost:8888/.netlify/functions/getPropertyTypes")
        // fetch("https://vacantprops.netlify.app/.netlify/functions/getPropertyTypes")
        .then((response) => response.json())
        .then((data) => setPropTypeRows(data))

        .catch((error) => console.error(error));

      console.log(propTypeRows);
    }

    fetchData();
  }, []);

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
          rows={propTypeRows}
          getRowId={(row) => row._id || uuid()}
          columns={[
            {
              field: "type",
              headerName: "Property Type",
              width: "300",
              editable: true,
            },
          ]}
          processRowUpdate={processRowUpdate}
          hideFooter
        />
        <Button type="button" variant="contained" onClick={addNewRow}>
          Add new Type
        </Button>
        <Button type="button" variant="contained">
          Save
        </Button>
      </Sheet>
    </Modal>
  );
};
