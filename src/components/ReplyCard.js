import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useMutation } from "@apollo/client";
import ErrorIcon from "@mui/icons-material/Error";
import PendingIcon from "@mui/icons-material/Pending";

import { DELETE_FORUM_REPLY } from "../mutations";
import { GET_FORUM_POST } from "../queries";

export const ReplyCard = ({ id, username, replies }) => {
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
    <Card sx={{ minWidth: 275, maxHeight: "300px", overflow: "auto" }}>
      {replies.map((reply) => (
        <Box key={reply.id} sx={{ px: 2 }}>
          <Typography id={reply.id} sx={{ mt: 2 }}>
            {reply.text}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {"— "}
            {reply.user}
            {" posted "}
            {reply.createdAt}
          </Typography>
          {username === reply.user && (
            <>
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
            </>
          )}
          <Divider />
        </Box>
      ))}
    </Card>
  );
};

// card should contain DELETE & EDIT reply buttons (for signed-in reply owner)
