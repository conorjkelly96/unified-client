import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { Error } from "./Error";
import { Spinner } from "../components/Spinner";
import { ForumPostCard } from "../components/ForumPostCard";
import { GET_FORUM_POST } from "../queries";

export const ViewForumPostPage = () => {
  const { id } = useParams();

  const {
    loading: postLoading,
    error: postError,
    data: postData,
    refetch,
  } = useQuery(GET_FORUM_POST, {
    variables: {
      postId: id,
    },
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
      mt: 4,
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
        <>
          {/* <Box>
            <Stack
              direction="row"
              justifyContent="start"
              sx={{ mt: 4, mx: 2, mb: 2 }}
            >
              <Button variant="contained" component="a" href="/forum">
                Back
              </Button>
            </Stack>
          </Box> */}
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
          <Box sx={styles.container}>
            <ForumPostCard
              id={postData.getForumPost.id}
              text={postData.getForumPost.postText}
              username={postData.getForumPost.postedBy.username}
              college={postData.getForumPost.postedBy.college}
              createdAt={postData.getForumPost.createdAt}
              replies={postData.getForumPost.replies}
              refetch={refetch}
            />
          </Box>
        </>
      )}
    </>
  );
};
