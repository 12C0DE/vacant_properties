import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Checkbox,
  Button,
} from "@mui/material";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { IconButton } from "@mui/material";
import Sheet from "@mui/joy/Sheet";
import { StateDDL } from "./StateDDL";
import { PropertyTypeDDL } from "./PropertyTypes/PropertyTypeDDL";
import { PropertyTypeAddBtn } from "./PropertyTypes/PropertyTypeAddBtn";
import { PropertyTypeList } from "./PropertyTypes/PropertyTypeList/PropertyTypeList";
import { ContactInfo } from "./ContactInfo";
import uuid from "react-uuid";

export const InputForm = () => {
  const [mailAddrMatches, setMailAddrMatches] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [contacts, setContacts] = useState([{}]);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const submitRecord = async (data) => {
    const newRecord = {
      businessName: data.businessName,
    };
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const AddNewContact = () => {
    // const currContacts = contacts;

    const newContact = {
      contactId: uuid(),
      firstName: null,
      lastName: null,
      phone: null,
      type: "Cell",
    };

    const currContacts = [...contacts, newContact];
    setContacts(currContacts);
  };

  const DeleteContact = (delID) => {
    const currContacts = contacts.filter((c) => c.contactId !== delID);

    setContacts(currContacts);
  };

  const UpdateContacts = (contactId) => {};

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:h-3/5">
        <Stack direction="column" flexWrap={true}>
          <TextField
            name="businessName"
            variant="outlined"
            label="Business Name"
          />
          <section name="CONTACT">
            <Stack direction="column" flexWrap={true}>
              <IconButton aria-label="addContact" onClick={AddNewContact}>
                <PersonAdd color="primary" />
              </IconButton>
              {contacts.map((c) => (
                <ContactInfo
                  contactId={c.contactId}
                  delContact={() => DeleteContact(c.contactId)}
                />
              ))}
            </Stack>
          </section>
          <Stack direction="row">
            <PropertyTypeDDL />
            <PropertyTypeAddBtn clickOpen={handleOpenModal} />
          </Stack>
          <section name="ADDRESS_SEC">
            <Stack direction="column">
              <TextField
                name="propertyAddress"
                variant="outlined"
                label="Property Address"
                error={errors.businessName}
                helperText={
                  errors.propertyAddress && errors.propertyAddress.message
                }
                {...register("propertyAddress", {
                  required: "Address is required",
                })}
              />
              <Stack direction="row" flexWrap={true}>
                <TextField
                  name="addrCity"
                  variant="outlined"
                  label="City"
                  error={errors.addrCity}
                />
                <StateDDL />
                <TextField
                  name="addrZip"
                  variant="outlined"
                  type="number"
                  label="Zip Code"
                  error={errors.addrZip}
                />
              </Stack>
            </Stack>
            {/* <Checkbox
              label="Mailing address the same?"
              onChangeCapture={() => setMailAddrMatches(!mailAddrMatches)}
            /> */}

            <FormControlLabel
              control={
                <Checkbox
                  onChangeCapture={() => setMailAddrMatches(!mailAddrMatches)}
                />
              }
              label="Mailing address matches"
            />
            {!mailAddrMatches ? (
              <Stack direction="column">
                <TextField
                  name="propertyAddressMail"
                  variant="outlined"
                  label="Mailing Address"
                  error={errors.propertyAddressMail}
                  helperText={
                    errors.propertyAddressMail &&
                    errors.propertyAddressMail.message
                  }
                  {...register("propertyAddress", {
                    required: "Address is required",
                  })}
                />
                <Stack direction="row" flexWrap={true}>
                  <TextField
                    name="addrCityMail"
                    variant="outlined"
                    label="City"
                    error={errors.addrCityMail}
                  />
                  <StateDDL />
                  <TextField
                    name="addrZipMail"
                    variant="outlined"
                    type="number"
                    label="Zip Code"
                    error={errors.addrZipMail}
                  />
                </Stack>
              </Stack>
            ) : null}
          </section>
          <TextField name="notes" variant="outlined" label="Notes" />
          <p className="text-xs text-right text-gray-600 italic mt-1">
            last updated: 10/14/23 12:23pm
          </p>
        </Stack>
      </form>
      <PropertyTypeList openModal={openModal} closeModal={handleCloseModal} />
      <Stack direction="row" justifyContent="end" spacing={3} className="my-4">
        <Button
          color="primary"
          variant="outlined"
          style={{ textTransform: "capitalize" }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          style={{ textTransform: "capitalize" }}
          type="submit"
        >
          Save
        </Button>
      </Stack>
    </Container>
  );
};
