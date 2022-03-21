import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReplyForm } from "../components/ReplyForm";
import { ReplyCard } from "../components/ReplyCard";
import { useAuth } from "../contexts/AppProvider";

export const ForumPostCard = ({
  id,
  text,
  username,
  college,
  createdAt,
  replies,
}) => {
  const styles = {
    header: {
      paddingTop: 3,
      paddingBottom: 2,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      maxWidth: 750,
      margin: "auto",
    },
  };

  const { user } = useAuth();

  return (
    <Card sx={{ minWidth: 275, mb: "25px", p: 3 }}>
      <CardContent>
        <Typography id={id}>{text}</Typography>

        <Typography color="text.secondary" sx={{ mt: "16px", mb: "5px" }}>
          {username}
          {college ? ", " : ""}
          {college || " "}
          {" posted "}
          {createdAt}
        </Typography>
        {user.username === username && (
          <Button
            id={id}
            variant="contained"
            size="small"
            endIcon={<DeleteIcon />}
            color="error"
            sx={{ mt: 2 }}
            //   onClick= {onDelete}
          >
            Delete Post
          </Button>
        )}
        <Typography
          variant="h6"
          gutterBottom
          component="h2"
          align="center"
          sx={{ paddingTop: 1 }}
        >
          {replies.length}
          {replies.length === 1 ? " Reply" : " Replies"}
        </Typography>
        <ReplyForm />
        {replies?.length > 0 ? (
          <ReplyCard replies={replies} />
        ) : (
          <Typography>No replies</Typography>
        )}
      </CardContent>
    </Card>
  );
};

// card should contain EDIT post button (for signed-in post owner)
