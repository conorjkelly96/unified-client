import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PreviewIcon from "@mui/icons-material/Preview";
import { Button } from "@mui/material";
import { CommentCard } from "./CommentCard";

export const PreviewItemCard = ({ item }) => {
  console.log(item);
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
