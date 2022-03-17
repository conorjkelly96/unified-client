import { useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GET_FORUM_POSTS } from "../queries";
import { Error } from "./Error";
import { ForumPostCard } from "../components/ForumPostCard";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

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
      flexDirection: "column",
      maxWidth: 750,
      margin: "auto",
    },
  };

  return (
    <>
      <Box sx={{ maxWidth: "750px", margin: "auto" }}>
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
      <Box sx={styles.container}>
        {data &&
          data.forumPosts.map((post) => (
            <ForumPostCard
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
    </>
  );
};
