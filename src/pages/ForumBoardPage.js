import { useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { GET_FORUM_POSTS } from "../queries";
import { Error } from "./Error";
import { ForumPostCard } from "../components/ForumPostCard";

export const ForumBoardPage = () => {
  const { data, loading, error } = useQuery(GET_FORUM_POSTS);

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
              text={post.postText}
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
