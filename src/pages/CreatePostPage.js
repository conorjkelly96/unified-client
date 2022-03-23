import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { CreateForumPostForm } from "../components/CreateForumPostForm";
import { mainContainer, pageHeader } from "../styles";

export const CreatePostPage = () => {
  return (
    <Container component="main" maxWidth="xs" sx={mainContainer}>
      <Typography
        variant="h4"
        gutterBottom
        component="h1"
        align="center"
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        New Forum Post
      </Typography>
      <Divider sx={{ maxWidth: "90%", margin: "auto" }} />
      <CreateForumPostForm />
    </Container>
  );
};
