import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "@apollo/client";

import { DELETE_FORUM_REPLY } from "../mutations";
import { useState } from "react";

export const ReplyCard = ({ id, username, replies }) => {
  const [repliesData, setRepliesData] = useState([]);

  // TODO: add delete forum reply mutation
  // const [executeDeleteReply, { loading, error }] =
  //   // useMutation(DELETE_FORUM_REPLY);

  const onReplyDelete = async (event) => {
    const replyId = event.currentTarget.id;
    try {
      const { data: deleteReplyData } = await executeDeleteReply({
        // TODO add variables
        variables: {},
      });

      if (deleteReplyData) {
        // TODO: refresh page by setting state
        // setRepliesData(deleteReplyData.)
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{ minWidth: 275, mt: "25px", maxHeight: "300px", overflow: "auto" }}
    >
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
                color="info"
                sx={{ mt: 2, mb: 1.5, border: "1px solid" }}
                //   onClick= {onReplyEdit}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                id={reply.id}
                size="small"
                color="error"
                sx={{ mt: 2, mb: 1.5, marginLeft: 1, border: "1px solid" }}
                onClick={onReplyDelete}
              >
                <DeleteIcon />
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
