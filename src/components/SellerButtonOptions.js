import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const SellerButtonOptions = ({ id, onDelete }) => {
  return (
    <Box sx={{ marginBottom: "10px" }}>
      <Button
        variant="contained"
        size="small"
        endIcon={<EditIcon />}
        color="info"
        sx={{ marginLeft: "8px" }}
        href={`/edit-item/${id}`}
      >
        Edit
      </Button>
      <Button
        id={id}
        variant="contained"
        size="small"
        endIcon={<DeleteIcon />}
        color="error"
        sx={{ marginLeft: "8px" }}
        onClick={onDelete}
      >
        Delete
      </Button>
    </Box>
  );
};
