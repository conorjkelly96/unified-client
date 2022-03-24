import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Container } from "@mui/material";

export const CommentCard = ({ comment }) => {
  console.log(comment);
  return (
    <Container>
      <Card sx={{ minWidth: 275, maxHeight: "300px", overflow: "auto" }}>
        <Box sx={{ px: 2 }}>
          <Typography sx={{ mt: 2 }}>{comment?.commentBody}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2 }}
          ></Typography>
          <Divider />
        </Box>
      </Card>
    </Container>
  );
};
