import { useState } from "react";
import { IconButton, MenuItem, Select, Stack, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";

export const ContactInfo = ({ contactId, delContact }) => {
  const [contact, setContact] = useState({
    contactId: contactId,
    firstName: "",
    lastName: "",
    phone: "",
    phoneType: "Cell",
  });

  return (
    <Stack direction="row" flexWrap={true}>
      <TextField
        name="firstName"
        variant="outlined"
        label="First Name"
        onChange={(e) =>
          setContact((prevState) => ({
            contact: { ...prevState.contact, firstName: e.target.value },
          }))
        }
      />
      <TextField
        name="lastName"
        variant="outlined"
        label="Last Name"
        onChange={(e) =>
          setContact((prevState) => ({
            contact: { ...prevState.contact, lastName: e.target.value },
          }))
        }
      />
      <TextField
        type="tel"
        variant="outlined"
        label="Phone Number"
        onChange={(e) =>
          setContact((prevState) => ({
            contact: { ...prevState.contact, phone: e.target.value },
          }))
        }
      />
      <Select
        variant="outlined"
        label="Type"
        defaultValue={contact.phoneType}
        onChange={(e) =>
          setContact((prevState) => ({
            contact: { ...prevState.contact, phoneType: e.target.value },
          }))
        }
      >
        <MenuItem value="Cell">Cell</MenuItem>
        <MenuItem value="Home">Home</MenuItem>
        <MenuItem value="Office">Office</MenuItem>
      </Select>
      <IconButton aria-label="delContact" onClick={delContact}>
        <Delete color="error" />
      </IconButton>
    </Stack>
  );
};
