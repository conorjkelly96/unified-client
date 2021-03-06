import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import ErrorIcon from "@mui/icons-material/Error";

import { CREATE_FORUM_REPLY } from "../mutations";
import { GET_FORUM_POST } from "../queries";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { postButton } from "../styles";

export const ReplyForm = () => {
  let { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [executeForumReply, { loading, error }] = useMutation(
    CREATE_FORUM_REPLY,
    {
      refetchQueries: [GET_FORUM_POST],
    }
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ replyText }) => {
    try {
      const { data } = await executeForumReply({
        variables: {
          postId: id,
          input: {
            text: replyText,
          },
        },
      });

      if (data?.forumReply) {
        setValue("replyText", "");
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
      mb: 4,
    },
    loadingButton: { marginTop: 2, marginBottom: 2 },
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
        id="replyText"
        label="Type your reply"
        name="replyText"
        variant="outlined"
        multiline
        minRows={2}
        fullWidth
        helperText={
          !!errors.replyText
            ? "*Reply must be 1-2000 characters"
            : "Limit 2000 characters"
        }
        {...register("replyText", { required: true, maxLength: 2000 })}
        error={!!errors.replyText}
        disabled={loading}
      />
      <Stack direction="row" justifyContent={isMobile ? "center" : "start"}>
        <LoadingButton
          loading={loading}
          loadingIndicator="Loading..."
          variant="contained"
          type="submit"
          sx={loading ? styles.loadingButton : { ...postButton }}
          startIcon={error && <ErrorIcon />}
          color={error ? "error" : "primary"}
        >
          Submit Reply
        </LoadingButton>
      </Stack>
      {error && (
        <Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={styles.errorContainer}
        >
          Failed to post your reply.
        </Typography>
      )}
    </Box>
  );
};
