import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { CreateForumPostForm } from "../components/CreateForumPostForm";

const styles = {
  container: {
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 3,
    paddingBottom: 2,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 4,
    paddingTop: 3,
  },
  loadingButton: { marginTop: 3, marginBottom: 2 },
  errorContainer: {
    marginTop: 2,
    color: "#d32f2f",
    textAlign: "center",
  },
};

export const CreatePostPage = () => {
  return (
    <Box sx={{ maxWidth: "750px", margin: "auto" }}>
      <Typography
        variant="h4"
        gutterBottom
        component="h1"
        align="center"
        sx={styles.header}
      >
        New Forum Post
      </Typography>
      <Divider sx={{ maxWidth: "90%", margin: "auto" }} />
      <CreateForumPostForm />
    </Box>
  );
};
