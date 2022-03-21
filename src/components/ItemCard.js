import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import BoltIcon from "@mui/icons-material/Bolt";
import { useAuth } from "../contexts/AppProvider";

export const ItemCard = ({
  id,
  itemName,
  itemDescription,
  category,
  status,
  condition,
  price,
  quantity,
  seller,
  images,
  onDelete,
  onAddItemToInterested,
}) => {
  const { user } = useAuth();

  return (
    <Card sx={{ minWidth: 275, mb: "25px" }}>
      <CardContent>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={`${itemDescription}`}
          src={`https://unified-resources.s3.eu-west-2.amazonaws.com/${seller}/images/${images}`}
        />
        <Typography variant="h5" component="div">
          {itemName || "Item Name"}
        </Typography>

        <Typography color="text.secondary">
          {itemDescription || "Item Description"}
        </Typography>

        <Typography sx={{ mb: 1.5 }}>{category || "Category"}</Typography>

        <Typography variant="body2" sx={{ mb: "15px" }}>
          {status || "Status"}
        </Typography>

        <Typography>
          {"Condition"}
          {condition}
        </Typography>

        <Typography>
          {"Price"}
          {price}
        </Typography>

        <Typography>
          {"Quantity"}
          {quantity}
        </Typography>

        <Typography>
          {"Seller"}
          {seller}
        </Typography>
      </CardContent>
      <CardActions>
        <Box>
          {seller && (
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
          )}
        </Box>
      </CardActions>
    </Card>
  );
};
