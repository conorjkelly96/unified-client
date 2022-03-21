import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

import { ReplyForm } from "../components/ReplyForm";
import { ReplyCard } from "../components/ReplyCard";
import { useAuth } from "../contexts/AppProvider";
import { useMutation } from "@apollo/client";
import { DELETE_FORUM_POST, UPDATE_FORUM_POST } from "../mutations";
import { useRef, useState } from "react";
import { Editable } from "./Editable";
import { useForm } from "react-hook-form";
import { EditableTextField } from "./EditableTextField";

export const ForumPostCard = ({
  id,
  text,
  username,
  college,
  createdAt,
  replies,
  refetch,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const textareaRef = useRef();
  const [description, setDescription] = useState(text);
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

  return (
    <Card sx={{ minWidth: 275, mb: "25px", p: 3 }}>
      <CardContent>
        {!isEditable && (
          <>
            <Typography component="p" variant="h6" id={id}>
              {text}
            </Typography>
            <Button
              variant="contained"
              size="small"
              color="info"
              sx={{ mt: 2 }}
              onClick={() => setIsEditable({ name: "postText" })}
            >
              Edit Post
            </Button>
          </>
        )}
        {isEditable?.name === "postText" && (
          <EditableTextField
            onSubmit={onSubmit}
            initialValue={text}
            onCancel={onCancel}
            label="Post Text"
            name="postText"
            required
          />
        )}

        <Typography color="text.secondary" sx={{ mt: 2, mb: "5px" }}>
          {user.username === username ? "You" : username}
          {college ? ", " : ""}
          {college || " "}
          {" posted "}
          {createdAt}
        </Typography>
        {user.username === username && (
          <Stack direction="row" justifyContent={isMobile ? "center" : "start"}>
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
          <ReplyCard replies={replies} username={username} />
        ) : (
          <Typography>No replies</Typography>
        )}
      </CardContent>
    </Card>
  );
};

// card should contain EDIT post button (for signed-in post owner)
