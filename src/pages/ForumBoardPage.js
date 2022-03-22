import { useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Error } from "./Error";
import { ForumPreviewCard } from "../components/ForumPreviewCard";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

import { Spinner } from "../components/Spinner";
import { GET_FORUM_POSTS } from "../queries";

export const ForumBoardPage = () => {
  const { data, loading, error } = useQuery(GET_FORUM_POSTS);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (error) {
    return <Error />;
  }
  console.log(data);

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

  return (
    <>
      {loading && (
        <Box sx={{ height: "500px" }}>
          <Spinner />
        </Box>
      )}

      <Box sx={{ margin: "auto", marginRight: 4 }}>
        <Stack
          direction="row"
          justifyContent={isMobile ? "center" : "end"}
          sx={{ marginTop: "32px" }}
        >
          <Button variant="contained" component="a" href="/create-post">
            Post Question
          </Button>
        </Stack>
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
      {!loading && data && (
        <Box sx={styles.container}>
          {data.forumPosts.map((post) => (
            <ForumPreviewCard
              id={post.id}
              text={post.postText.slice(0, 100)}
              username={post.postedBy.username}
              college={post.postedBy.college}
              createdAt={post.createdAt}
              replies={post.replies}
              key={post.id}
            />
          ))}
        </Box>
      )}

      {!loading && !data && (
        <Box sx={{ height: "75vh" }}>
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            align="center"
            sx={styles.header}
          >
            There are currently no forum posts.
          </Typography>
        </Box>
      )}
    </>
  );
};
