import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import { Error } from "./Error";
import { Spinner } from "../components/Spinner";
import { ForumPostCard } from "../components/ForumPostCard";
import { GET_FORUM_POST } from "../queries";

export const ViewForumPostPage = () => {
  let { id } = useParams();

  const {
    loading: postLoading,
    error: postError,
    data: postData,
  } = useQuery(GET_FORUM_POST, {
    variables: {
      postId: id,
    },
    pollInterval: 5000,
  });

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

  if (postError) {
    return <Error />;
  }

  if (postLoading) {
    return (
      <Box sx={{ height: "500px" }}>
        <Spinner />
      </Box>
    );
  }

  return (
    <>
      {!postLoading && postData?.getForumPost && (
        <Box sx={styles.container}>
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            align="center"
            sx={styles.header}
          >
            Forum
          </Typography>
          <ForumPostCard
            id={postData.getForumPost.id}
            text={postData.getForumPost.postText}
            username={postData.getForumPost.postedBy.username}
            college={postData.getForumPost.postedBy.college}
            createdAt={postData.getForumPost.createdAt}
            replies={postData.getForumPost.replies}
          />
        </Box>
      )}
    </>
  );
};
