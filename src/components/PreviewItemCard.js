import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CommentCard } from "./CommentCard";

export const PreviewItemCard = ({ item }) => {
  return (
    <Card sx={{ minWidth: 275, mb: "25px" }}>
      <CardContent>
        <Typography component="p" variant="h6">
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
