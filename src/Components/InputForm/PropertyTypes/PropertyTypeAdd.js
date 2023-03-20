import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";

export const PropertyTypeAdd = ({ clickOpen }) => {
  return (
    <IconButton aria-label="add Property type" onClick={() => clickOpen(true)}>
      <AddCircleOutlineIcon color="primary" />
    </IconButton>
  );
};
