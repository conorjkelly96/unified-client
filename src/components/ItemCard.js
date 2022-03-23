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
        {/* <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={`${itemDescription}`}
          src={`https://unified-resources.s3.eu-west-2.amazonaws.com/${seller}/images/${imageId}`}
        /> */}
        <ImageList cols={3} gap={8}>
          {images.map((image, index) => {
            return (
              <ImageListItem key={index}>
                <img src={image} />
              </ImageListItem>
            );
          })}
          {/* <ImageListItem key={id}>
          <img
            src={`https://unified-resources.s3.eu-west-2.amazonaws.com/brunomars/images/7c77afeb-c914-4368-ac93-74fe3580b214`}
          />
        </ImageListItem> */}
        </ImageList>

        <Typography variant="h5" component="div">
          {itemName || "Item Name:"}
        </Typography>

        <Typography color="text.secondary">
          {itemDescription || "Item Description"}
        </Typography>

        <Typography sx={{ mb: 1.5 }}>{category || "Category"}</Typography>

        <Typography variant="body2" sx={{ mb: "15px" }}>
          {"Listing status: "}
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
