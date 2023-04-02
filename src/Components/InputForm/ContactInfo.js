import { useEffect, useState } from "react";
import { IconButton, MenuItem, Select, Stack, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";

export const ContactInfo = ({ contactId, delContact, updateContact }) => {
  const [contact, setContact] = useState({
    contactId: contactId,
    firstName: "",
    lastName: "",
    phone: "",
    phoneType: "Cell",
  });

  useEffect(() => {
    updateContact(contact);
  }, [contact]);

  const handleContactChange = (contactVal, contactField) => {
    switch (contactField) {
      case "firstName":
        if (contact.firstName !== contactVal) {
          setContact((prevState) => ({
            ...prevState,
            firstName: contactVal,
          }));
        }
        return;
      case "lastName":
        if (contact.lastName !== contactVal) {
          setContact((prevState) => ({
            ...prevState,
            lastName: contactVal,
          }));
        }
        return;
      case "phone":
        if (contact.phone !== contactVal) {
          const regexContact = contactVal.replace(/[^0-9-]/g, "");

          setContact((prevState) => ({
            ...prevState,
            phone: regexContact,
          }));
        }
        return;
      case "phoneType":
        if (contact.phoneType !== contactVal) {
          setContact((prevState) => ({
            ...prevState,
            phoneType: contactVal,
          }));
        }
        return;
      default:
        return contact;
    }
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      flexWrap={true}
      className="my-1 mb-4 sm:mb-0"
      spacing={1}
    >
      <TextField
        name="firstName"
        variant="outlined"
        label="First Name"
        onBlur={(e) => handleContactChange(e.target.value, "firstName")}
      />
      <TextField
        name="lastName"
        variant="outlined"
        label="Last Name"
        onBlur={(e) => handleContactChange(e.target.value, "lastName")}
      />
      <TextField
        type="tel"
        variant="outlined"
        label="Phone Number"
        value={contact.phone}
        onChange={(e) => handleContactChange(e.target.value, "phone")}
      />
      <Stack direction="row" flexWrap="nowrap">
        <Select
          variant="outlined"
          label="Type"
          value={contact.phoneType}
          onChange={(e) => handleContactChange(e.target.value, "phoneType")}
          sx={{ width: 90 }}
        >
          <MenuItem value="Cell">Cell</MenuItem>
          <MenuItem value="Home">Home</MenuItem>
          <MenuItem value="Office">Office</MenuItem>
        </Select>
        <IconButton aria-label="delContact" onClick={delContact}>
          <Delete color="error" />
        </IconButton>
      </Stack>
    </Stack>
  );
};
