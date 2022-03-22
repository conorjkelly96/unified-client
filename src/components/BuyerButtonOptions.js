import { Box, Button } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import BoltIcon from "@mui/icons-material/Bolt";

export const BuyerButtonOptions = ({ id, onAddItemToInterested }) => {
  return (
    <Box sx={{ marginBottom: "10px" }}>
      <Button
        id={id}
        variant="contained"
        size="small"
        endIcon={<PreviewIcon />}
        color="success"
        sx={{ marginLeft: "8px" }}
        href={`/listing/${id}`}
      >
        View Listing
      </Button>
      <Button
        id={id}
        variant="contained"
        size="small"
        endIcon={<BoltIcon />}
        color="warning"
        sx={{ marginLeft: "8px" }}
        onClick={onAddItemToInterested}
      >
        Quick Add To Interested
      </Button>
    </Box>
  );
};
