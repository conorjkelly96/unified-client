import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PreviewIcon from "@mui/icons-material/Preview";
import { Button } from "@mui/material";
import { CommentCard } from "./CommentCard";

export const PreviewItemCard = ({ item }) => {
  return (
    <Card sx={{ minWidth: 275, mb: "25px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {item.itemName || "Item Name"}
        </Typography>
      </CardContent>
      <Box>
        {item.comments.length &&
          item.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
      </Box>
    </Card>
  );
};

{
  /* <Card sx={{ minWidth: 275, mb: "25px" }}>
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
    </Card> */
}
