import { useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

import { GET_FORUM_POSTS } from "../queries";
import { Spinner } from "../components/Spinner";
import { ForumPreviewCard } from "../components/ForumPreviewCard";
import { Error } from "./Error";
import { alertContainer, mainContainer } from "../styles";

export const ForumBoardPage = () => {
  const { data, loading, error } = useQuery(GET_FORUM_POSTS);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (error) {
    return <Error />;
  }

  const styles = {
    header: {
      paddingTop: 3,
      paddingBottom: 2,
    },
    container: {
      display: "flex",
      flexDirection: "column-reverse",
      maxWidth: 750,
      margin: "auto",
    },
  };

  console.log(data);

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ ...mainContainer, boxShadow: "none" }}
    >
      <Spinner loading={loading} />

      {!loading && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: isMobile ? "center" : "flex-end",
            }}
          >
            <Button variant="contained" component="a" href="/create-post">
              Post Question
            </Button>
          </Box>
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            align="center"
            sx={styles.header}
          >
            Forum
          </Typography>
          <Divider sx={{ maxWidth: "90%", margin: "auto", mb: "40px" }} />
        </>
      )}

      {!loading && data?.forumPosts && (
        <Box sx={styles.container}>
          {data?.forumPosts.map((post) => (
            <ForumPreviewCard
              id={post.id}
              text={post.postText.slice(0, 100)}
              username={post.postedBy.username}
              college={post.postedBy.college}
              createdAt={post.createdAt}
              replyCount={post.replyCount}
              key={post.id}
            />
          ))}
        </Box>
      )}

      {!loading && !data?.forumPosts.length === 0 && (
        <Alert icon={false} severity="info" sx={alertContainer}>
          There are currently no forum posts.
        </Alert>
      )}
    </Container>
  );
};
