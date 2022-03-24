import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BuyerButtonOptions } from "./BuyerButtonOptions";
import { SellerButtonOptions } from "./SellerButtonOptions";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

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
  sellerId,
  userId,
  handleClickOpen,
  isPreview,
}) => {
  return (
    <Card sx={{ minWidth: 275, mb: "25px" }}>
      <CardContent>
        <ImageList cols={3} gap={8}>
          {images.map((image, index) => {
            return (
              <ImageListItem key={index}>
                <img src={image} />
              </ImageListItem>
            );
          })}
        </ImageList>

        <Typography variant="h5" component="div">
          {itemName}
        </Typography>

        <Typography color="text.secondary">{itemDescription}</Typography>

        <Typography
          variant="body2"
          sx={{ mb: "15px" }}
        >{`Category: ${category}`}</Typography>

        <Typography variant="body2" sx={{ mb: "15px" }}>
          {"Listing Status:"}
          {status}
        </Typography>

        <Typography>
          {"Condition: "}
          {condition}
        </Typography>

        <Typography>
          {"Price: £"}
          {price}
        </Typography>

        <Typography>
          {"Quantity: "}
          {quantity}
        </Typography>

        <Typography>
          {"Seller: "}
          {seller}
        </Typography>
      </CardContent>
      {!isPreview && (
        <CardActions>
          <Box>
            {sellerId !== userId ? (
              <BuyerButtonOptions
                id={id}
                onAddItemToInterested={onAddItemToInterested}
                handleClickOpen={handleClickOpen}
              />
            ) : (
              <SellerButtonOptions id={id} onDelete={onDelete} />
            )}
          </Box>
        </CardActions>
      )}
    </Card>
  );
};
