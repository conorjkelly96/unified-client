import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";

import { useNavigate } from "react-router-dom";
import { CREATE_FORUM_POST } from "../mutations";

export const CreateForumPostForm = () => {
  const [executeCreateForumPost, { loading, error }] =
    useMutation(CREATE_FORUM_POST);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ postText }) => {
    try {
      const { data } = await executeCreateForumPost({
        variables: {
          forumPost: {
            postText,
          },
        },
      });

      if (data) {
        navigate("/forum", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <Box component="form" sx={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        margin="normal"
        id="postText"
        label="Type your question"
        name="postText"
        variant="outlined"
        multiline
        minRows={5}
        fullWidth
        autoFocus
        helperText={"Limit 2000 characters"}
        {...register("postText", { required: true, maxLength: 2000 })}
        error={!!errors.postText}
        disabled={loading}
      />
      <LoadingButton
        loading={loading}
        loadingIndicator="Loading..."
        variant="contained"
        fullWidth
        type="submit"
        sx={styles.loadingButton}
        startIcon={error && <ErrorIcon />}
        color={error ? "error" : "primary"}
      >
        Post
      </LoadingButton>
      {error && (
        <Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={styles.errorContainer}
        >
          Failed to post to the forum.
        </Typography>
      )}
    </Box>
  );
};
