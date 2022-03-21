import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import { useAuth } from "../contexts/AppProvider";

export const ReplyCard = ({ id, username, replies }) => {
  // const { user } = useAuth();
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

  console.log(replies);

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
                id={id}
                size="small"
                color="info"
                sx={{ mt: 2, mb: 1.5, border: "1px solid" }}
                //   onClick= {onDelete}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                id={id}
                size="small"
                color="error"
                sx={{ mt: 2, mb: 1.5, marginLeft: 1, border: "1px solid" }}
                //   onClick= {onDelete}
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
