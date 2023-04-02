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
import { Textarea } from "@mui/joy";
import axios from "axios";

export const InputForm = () => {
  const [mailAddrMatches, setMailAddrMatches] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [typesUpdated, setTypesUpdated] = useState(false);
  const [isVacant, setIsVacant] = useState(true);
  const [recordSaved, setRecordSaved] = useState(false);
  const [contacts, setContacts] = useState([
    {
      contactId: uuid(),
      firstName: null,
      lastName: null,
      phone: null,
      type: "Cell",
    },
  ]);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({ defaultValues: { vacantTag: true } });
  const onSubmit = (data) => {
    console.log("within onSubmit");
    console.log(data);
  };

  const submitRecord = async (data) => {
    console.log("submit record");

    const newRecord = {
      businessName: data.businessName,
      contacts: contacts,
      propertyType: data.propertyType,
      propertyTag: isVacant,
      propertyAddress: data.propertyAddress,
      propertyCity: data.addrCity,
      propertyZip: data.addrZip,
      mailingAddress: mailAddrMatches
        ? data.propertyAddress
        : data.mailingAddress,
      mailingCity: mailAddrMatches ? data.addrCity : data.addrCityMail,
      mailingState: mailAddrMatches ? data.addrState : data.addrStateMail,
      mailingZip: mailAddrMatches ? data.addrZip : data.addrZipMail,
      notes: data.notes,
    };

    console.log(`new record`);
    console.log(newRecord);

    axios
      .post("http://localhost:8888/.netlify.functions/addProperty", newRecord)
      .then((res) =>
        res.statusCode === 200 ? setRecordSaved(true) : setRecordSaved(false)
      );
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const AddNewContact = () => {
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

  const UpdateContacts = (contactData) => {
    const currContacts = [...contacts];

    const currContactIndex = currContacts.findIndex(
      (c) => c.contactId === contactData.contactId
    );

    if (currContactIndex > -1) {
      currContacts[currContactIndex] = contactData;
    } else {
      currContacts.push(contactData);
      currContacts.slice();
    }

    setContacts(currContacts);
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit(submitRecord)} className="w-full md:h-3/5">
        <Stack direction="column" flexWrap={true} spacing={1}>
          <Button
            variant="contained"
            color={isVacant ? "success" : "error"}
            onClick={() => setIsVacant(!isVacant)}
            className="w-60 place-self-end"
            {...register("vacantTag")}
            value={isVacant}
            defaultValue={isVacant}
          >
            {isVacant ? "Vacant" : "Not Vacant"}
          </Button>
          <TextField
            name="businessName"
            variant="outlined"
            label="Business Name"
            {...register("businessName", {
              required: "Business Name is required",
            })}
            error={errors.businessName}
            helperText={errors.businessName && errors.businessName.message}
          />
          <section name="CONTACT">
            <Sheet variant="outlined" className="rounded-md my-2 p-2">
              <Stack direction="column" flexWrap={true}>
                <Stack
                  direction="row"
                  flexWrap="nowrap"
                  className="items-center"
                >
                  <h3 className="text-gray-500 px-2">Add Contact</h3>
                  <IconButton
                    className="justify-self-start"
                    aria-label="addContact"
                    onClick={AddNewContact}
                    style={{ width: 30, marginTop: 5, marginBottom: 5 }}
                  >
                    <PersonAdd color="primary" />
                  </IconButton>
                </Stack>
                {contacts.map((c) => (
                  <ContactInfo
                    key={c.contactId}
                    contactId={c.contactId}
                    delContact={() => DeleteContact(c.contactId)}
                    updateContact={UpdateContacts}
                  />
                ))}
              </Stack>
            </Sheet>
          </section>
          <Sheet variant="outlined" className="rounded-md my-2 p-2">
            <Stack direction="row" className="mb-2">
              <PropertyTypeDDL
                updateList={typesUpdated}
                register={register}
                errors={errors}
              />
              <PropertyTypeAddBtn clickOpen={handleOpenModal} />
            </Stack>
            <section name="ADDRESS_SEC">
              <Stack direction="column" spacing={1} flexWrap="wrap">
                <TextField
                  name="propertyAddress"
                  variant="outlined"
                  label="Property Address"
                  {...register("propertyAddress", {
                    required: "Address is required",
                  })}
                  error={errors.propertyAddress}
                  helperText={
                    errors.propertyAddress && errors.propertyAddress.message
                  }
                />
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  className="mt-2"
                  spacing={1}
                  flexWrap="wrap"
                >
                  <TextField
                    name="addrCity"
                    variant="outlined"
                    label="City"
                    {...register("addrCity", {
                      required: "City is required",
                    })}
                    error={errors.addrCity}
                    helperText={errors.addrCity && errors.addrCity.message}
                  />
                  <StateDDL register={register} registerName="addrState" />
                  <TextField
                    name="addrZip"
                    variant="outlined"
                    type="number"
                    label="Zip Code"
                    {...register("addrZip", {
                      required: "Zip code is required",
                    })}
                    error={errors.addrZip}
                    helperText={errors.addrZip && errors.addrZip.message}
                  />
                </Stack>
              </Stack>
              <div className="flex justify-self-start">
                <FormControlLabel
                  control={
                    <Checkbox
                      onChangeCapture={() =>
                        setMailAddrMatches(!mailAddrMatches)
                      }
                    />
                  }
                  label="Mailing address matches"
                  className="justify-self-start"
                />
              </div>
              {!mailAddrMatches ? (
                <Stack direction="column" spacing={1}>
                  <TextField
                    name="propertyAddressMail"
                    variant="outlined"
                    label="Mailing Address"
                    {...register("propertyAddressMail")}
                  />
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    flexWrap={true}
                    spacing={1}
                  >
                    <TextField
                      name="addrCityMail"
                      variant="outlined"
                      label="City"
                      {...register("addrCityMail")}
                    />
                    <StateDDL
                      register={register}
                      registerName="addrStateMail"
                    />
                    <TextField
                      name="addrZipMail"
                      variant="outlined"
                      type="number"
                      label="Zip Code"
                    />
                  </Stack>
                </Stack>
              ) : null}
            </section>
          </Sheet>
          <Textarea
            size="md"
            minRows={1}
            placeholder="Notes"
            {...register("notes")}
          />
          <p className="text-xs text-right text-gray-600 italic mt-1">
            last updated: {}
          </p>
        </Stack>
        <Stack
          direction="row"
          justifyContent="end"
          spacing={3}
          className="my-4"
        >
          <Button
            color="primary"
            variant="outlined"
            style={{ textTransform: "capitalize" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ textTransform: "capitalize" }}
          >
            Save
          </Button>
        </Stack>
      </form>
      <PropertyTypeList
        openModal={openModal}
        closeModal={handleCloseModal}
        saveSuccess={setTypesUpdated}
      />
    </Container>
  );
};
