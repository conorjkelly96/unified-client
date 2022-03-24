import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useMutation } from "@apollo/client";
import ErrorIcon from "@mui/icons-material/Error";
import PendingIcon from "@mui/icons-material/Pending";
import Avatar from "@mui/material/Avatar";
import { Container } from "@mui/material";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";

export const CommentCard = ({ comment }) => {
  console.log(comment);
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
                {comment?.username.id}
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
    // <Container>
    //   <Card sx={{ minWidth: 275, maxHeight: "300px", overflow: "auto" }}>
    //     <Box sx={{ px: 2 }}>
    //       <Typography sx={{ mt: 2 }}>{comment?.commentBody}</Typography>
    //       <Typography
    //         variant="body2"
    //         color="text.secondary"
    //         sx={{ mt: 2 }}
    //       ></Typography>
    //       <Divider />
    //     </Box>
    //   </Card>
    // </Container>
  );
};
