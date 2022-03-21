import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ReplyForm } from "../components/ReplyForm";
import { ReplyCard } from "../components/ReplyCard";
import { useAuth } from "../contexts/AppProvider";
import { useMutation } from "@apollo/client";
import { DELETE_FORUM_POST } from "../mutations";

export const ForumPostCard = ({
  id,
  text,
  username,
  college,
  createdAt,
  replies,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  // TODO: handle this loading and error?
  const [executeDeletePost, { loading, error }] =
    useMutation(DELETE_FORUM_POST);

  // TODO: add delete forum reply mutation
  //   const [executeDeleteReply, { loading: deleteReplyLoading, error: deleteReplyError }] =
  //     useMutation(DELETE_FORUM_REPLY);

  const onDelete = async (event) => {
    const deleteForumPostId = event.target.id;

    try {
      const { data } = await executeDeletePost({
        variables: {
          deleteForumPostId,
        },
      });

      if (data) {
        navigate("/forum", { replace: true });
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <Typography component="p" variant="h6" id={id}>
          {text}
        </Typography>

        <Typography color="text.secondary" sx={{ mt: "16px", mb: "5px" }}>
          {username}
          {college ? ", " : ""}
          {college || " "}
          {" posted "}
          {createdAt}
        </Typography>
        {user.username === username && (
          <Stack direction="row" justifyContent={isMobile ? "center" : "start"}>
            <Button
              id={id}
              variant="contained"
              size="small"
              endIcon={<DeleteIcon />}
              color="error"
              sx={{ mt: 2 }}
              onClick={onDelete}
            >
              Delete Post
            </Button>
          </Stack>
        )}
        <Typography
          variant="h6"
          gutterBottom
          component="h2"
          align="center"
          sx={{ paddingTop: 2 }}
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
