import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export const CommentCard = ({ username, comments }) => {
  return (
    <Card sx={{ minWidth: 275, maxHeight: "300px", overflow: "auto" }}>
      {comments.map((comment) => (
        <Box sx={{ px: 2 }}>
          <Typography sx={{ mt: 2 }}>{comment.text}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {"— "}
            {comment.user}
            {" posted "}
            {comment.createdAt}
          </Typography>
          {username === comment.user && (
            <>
              <IconButton
                size="small"
                color="error"
                sx={{ mt: 2, mb: 1.5, marginLeft: 1, border: "1px solid" }}
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
