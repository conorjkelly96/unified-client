import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReplyForm } from "../components/ReplyForm";
import { useAuth } from "../contexts/AppProvider";

export const ReplyCard = ({
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

  return (
    <>
      <h1>ReplyCard here</h1>
      {replies?.length > 0 && (
        <Card sx={{ minWidth: 275, mb: "25px" }}>
          {replies.map((reply) => (
            <Box sx={{ p: "8px" }}>
              <Typography id={reply.id}>{reply.text}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: "16px", mb: "5px" }}
              >
                {"— "}
                {reply.user}
                {" posted "}
                {reply.createdAt}
              </Typography>
              <Divider />
            </Box>
          ))}

          {/* {user.username === username && (
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
        )} */}
        </Card>
      )}
    </>
  );
};
