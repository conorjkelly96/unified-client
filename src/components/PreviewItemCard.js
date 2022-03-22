import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PreviewIcon from "@mui/icons-material/Preview";
import { Button } from "@mui/material";

export const PreviewItemCard = ({ id, itemName, itemDescription, status }) => {
  return (
    <Card sx={{ minWidth: 275, mb: "25px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {itemName || "Item Name"}
        </Typography>

        <Typography color="text.secondary">
          {itemDescription || "Item Description"}
        </Typography>

        <Typography variant="body2" sx={{ mb: "15px" }}>
          {status || "Status"}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ marginBottom: "10px" }}>
          <Button
            id={id}
            variant="contained"
            size="small"
            endIcon={<PreviewIcon />}
            color=""
            sx={{ marginLeft: "8px" }}
          >
            Review Comments
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
