import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../contexts/AppProvider";

export const ItemCard = ({
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
}) => {
  const { user } = useAuth();

  return (
    <Card sx={{ minWidth: 275, mb: "25px" }}>
      <CardContent>
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

        <Typography sx={{ mb: 1.5 }}>{category || "Category"}</Typography>

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
          {seller.username}
        </Typography>
      </CardContent>
      <CardActions>
        <Box>
          <Button
            size="small"
            component="a"
            target="_blank"
            // href={url}
            sx={{ marginBottom: "16px" }}
          >
            {user?.__typename === "Student" ? "Link" : "Interested"}
          </Button>
          {user?.__typename === "Student" && (
            <Box sx={{ marginBottom: "10px" }}>
              <Button
                variant="contained"
                size="small"
                endIcon={<EditIcon />}
                color="info"
                sx={{ marginLeft: "8px" }}
                // onClick={}
              >
                Edit
              </Button>
              <Button
                // id={id}
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
          )}
        </Box>
      </CardActions>
    </Card>
  );
};
