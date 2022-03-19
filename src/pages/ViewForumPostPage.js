import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Error } from "./Error";
import { Spinner } from "../components/Spinner";
import { ForumPostCard } from "../components/ForumPostCard";
import { GET_FORUM_POST } from "../queries";
import Typography from "@mui/material/Typography";

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
  });

  // TODO: add delete forum reply mutation
  //   const [executeDeleteReply, { loading: deleteReplyLoading, error: deleteReplyError }] =
  //     useMutation(DELETE_FORUM_REPLY);

  //   const [postData, setPostData] = useState([]);

  //   useEffect(() => {
  //     const getForumPostData = async () => {
  //       try {
  //         const { data: forumPostData, error: forumPostError } =
  //           await executeGetForumPost({
  //             variables: {
  //               postId: id,
  //             },
  //           });

  //         console.log(postData);

  //         if (forumPostError) {
  //           throw new Error("Something went wrong.");
  //         }

  //         // console.log(forumPostData.getForumPost);

  //         setPostData(forumPostData.getForumPost);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     getForumPostData();
  //   }, [postData, executeGetForumPost]);

  // display ForumPostCard, mapping through replies; pass data values to ForumPostCard as props

  // card should contain: 1) REPLY button, 2-3) DELETE & EDIT buttons (for signed-in post owner), 4-5) DELETE & EDIT reply buttons (for signed-in reply owner)

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
  console.log(postData);
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
