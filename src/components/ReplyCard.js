import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useMutation } from "@apollo/client";
import ErrorIcon from "@mui/icons-material/Error";
import PendingIcon from "@mui/icons-material/Pending";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

import { DELETE_FORUM_REPLY } from "../mutations";
import { GET_FORUM_POST } from "../queries";
import { useAuth } from "../contexts/AppProvider";

export const ReplyCard = ({ id, username, replies }) => {
  const { user } = useAuth();

  const [executeDeleteReply, { loading, error }] = useMutation(
    DELETE_FORUM_REPLY,
    { refetchQueries: [GET_FORUM_POST] }
  );

  const onReplyDelete = async (event) => {
    const replyId = event.currentTarget.id;

    try {
      const { data: deleteReplyData } = await executeDeleteReply({
        variables: {
          postId: id,
          replyId,
        },
      });

      if (!deleteReplyData) {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <List sx={{ width: "100%", maxWidth: 720, bgcolor: "background.paper" }}>
      {replies.map((reply) => {
        return (
          <ListItem key={reply.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={`${reply.user.username}`}
                src={reply.user.profileImageUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={reply.text}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {reply.user.username}
                  </Typography>
                </>
              }
            />
            {user.username === reply.user.username && (
              <IconButton
                id={reply.id}
                size="small"
                color="error"
                sx={{ mt: 2, mb: 1.5, marginLeft: 1, border: "1px solid" }}
                onClick={onReplyDelete}
              >
                {!loading && error && <ErrorIcon />}
                {loading && <PendingIcon />}
                {!loading && !error && <DeleteIcon />}
              </IconButton>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

// card should contain DELETE & EDIT reply buttons (for signed-in reply owner)
