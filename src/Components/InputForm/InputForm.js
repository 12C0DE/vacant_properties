import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Checkbox,
} from "@mui/material";
import { StateDDL } from "./StateDDL";
import { PropertyTypeDDL } from "./PropertyTypes/PropertyTypeDDL";
import { PropertyTypeAdd } from "./PropertyTypes/PropertyTypeAdd";
import { PropertyTypeList } from "./PropertyTypes/PropertyTypeList";

export const InputForm = () => {
  const [mailAddrMatches, setMailAddrMatches] = useState();
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:h-3/5">
        <Stack direction="column" flexWrap={true}>
          <TextField
            name="businessName"
            variant="outlined"
            label="Business Name"
          />
          <Stack direction="row">
            <TextField name="firstName" variant="outlined" label="First Name" />
            <TextField name="lastName" variant="outlined" label="Last Name" />
          </Stack>
          <Stack direction="row">
            <PropertyTypeDDL />
            <PropertyTypeAdd clickOpen={handleOpenModal} />
          </Stack>
          <section name="addressSec">
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
        </Stack>
      </form>
      <PropertyTypeList openModal={openModal} closeModal={handleCloseModal} />
    </Container>
  );
};
