import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAuth } from "../contexts/AppProvider";

export const ForumPostCard = ({
  id,
  text,
  username,
  college,
  createdAt,
  replies,
}) => {
  const { user } = useAuth();

  return (
    <Card sx={{ minWidth: 275, mb: "25px" }}>
      <CardContent>
        {/* TODO: link to ViewForumPost page */}
        <Typography id={id} variant="h5" component="a">
          {text}
        </Typography>

        <Typography color="text.secondary" sx={{ mt: "8px", mb: "5px" }}>
          {username}
          {college ? ", " : ""}
          {college || " "}
          {" posted "}
          {createdAt}
        </Typography>

        <Typography variant="body2">
          {replies.length} {"replies"}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction={"row"} sx={{ justifyContent: "center" }}>
          <Box sx={{ marginBottom: "10px" }}>
            <Button
              size="small"
              variant="contained"
              color="info"
              sx={{ marginLeft: "8px" }}
            >
              View Replies
            </Button>
            {user.username === username && (
              <Button
                id={id}
                variant="contained"
                size="small"
                endIcon={<DeleteIcon />}
                color="error"
                sx={{ marginLeft: "8px" }}
                //   onClick= {onDelete}
              >
                Delete
              </Button>
            )}
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
};
