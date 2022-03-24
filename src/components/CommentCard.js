import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Avatar from "@mui/material/Avatar";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";

export const CommentCard = ({ comment }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 720, bgcolor: "background.paper" }}>
      <ListItem key={comment.commentId} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          primary={comment?.commentBody}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment?.username.username}
              </Typography>
            </>
          }
        />
        <IconButton
          id={comment.commentId}
          size="small"
          color="error"
          sx={{ mt: 2, mb: 1.5, marginLeft: 1, border: "1px solid" }}
          // onClick={onReplyDelete}
        ></IconButton>
      </ListItem>
    </List>
  );
};
