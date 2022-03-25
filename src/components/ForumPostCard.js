import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useMutation } from "@apollo/client";
import ListItemText from "@mui/material/ListItemText";
import { useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

import { ReplyForm } from "../components/ReplyForm";
import { ReplyCard } from "../components/ReplyCard";
import { useAuth } from "../contexts/AppProvider";
import { DELETE_FORUM_POST, UPDATE_FORUM_POST } from "../mutations";
import { EditableTextField } from "./EditableTextField";

export const ForumPostCard = ({
  id,
  text,
  username,
  college,
  createdAt,
  replies,
  tags,
  profileImageUrl,
  refetch,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState();

  // TODO: handle this loading and error?
  const [executeDeletePost, { loading, error }] =
    useMutation(DELETE_FORUM_POST);

  const [executeUpdatePost, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_FORUM_POST);

  const onPostDelete = async (event) => {
    const deleteForumPostId = event.target.id;

    try {
      const { data } = await executeDeletePost({
        variables: {
          deleteForumPostId,
        },
      });

      if (data) {
        navigate("/forum", { replace: true });
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async ({ postText }) => {
    const { data } = await executeUpdatePost({
      variables: {
        updateForumPostId: id,
        input: {
          postText,
        },
      },
    });
    if (data?.updateForumPost) {
      setIsEditable();
      refetch();
    }
  };

  const onCancel = () => setIsEditable();

  const { user } = useAuth();

  console.log(profileImageUrl);

  return (
    <Card sx={{ minWidth: 275, mb: "25px", p: 3 }}>
      <CardContent>
        <>
          <Typography component="p" variant="h6" id={id}>
            {text}
          </Typography>

          <List
            sx={{
              width: "100%",
              maxWidth: 720,
            }}
          >
            <ListItem alignItems="flex-start" sx={{ paddingLeft: "0px" }}>
              <ListItemAvatar>
                <Avatar alt={`${username} profile`} src={profileImageUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={user.username === username ? "You" : username}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
                    {"Posted "}
                    {createdAt}
                  </>
                }
              />
            </ListItem>
          </List>

          {!isEditable && user.username === username && (
            <Stack
              direction="row"
              justifyContent={isMobile ? "center" : "start"}
            >
              <Button
                variant="contained"
                size="small"
                endIcon={<EditIcon />}
                color="info"
                sx={{ mt: 2 }}
                onClick={() => setIsEditable({ name: "postText" })}
              >
                Edit Post
              </Button>
              <Button
                id={id}
                variant="contained"
                size="small"
                endIcon={<DeleteIcon />}
                color="error"
                sx={{ mt: 2, marginLeft: 1 }}
                onClick={onPostDelete}
              >
                Delete Post
              </Button>
            </Stack>
          )}
        </>
        {isEditable?.name === "postText" && (
          <EditableTextField
            onSubmit={onSubmit}
            initialValue={text}
            onCancel={onCancel}
            label="Post your question"
            name="postText"
            required
          />
        )}
        <Typography
          variant="h6"
          gutterBottom
          component="h2"
          align="center"
          sx={{ mt: 4 }}
        >
          {replies.length}
          {replies.length === 1 ? " Reply" : " Replies"}
        </Typography>
        <ReplyForm />
        {replies?.length > 0 ? (
          <ReplyCard replies={replies} username={username} id={id} />
        ) : (
          <Typography>No replies</Typography>
        )}
      </CardContent>
    </Card>
  );
};
