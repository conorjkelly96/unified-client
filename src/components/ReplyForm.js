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

export const ReplyForm = () => {
  let { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [executeCreateForumReply, { loading, error }] = useMutation(
    CREATE_FORUM_REPLY,
    {
      refetchQueries: [GET_FORUM_POST],
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ replyText }) => {
    try {
      const { data } = await executeCreateForumReply({
        variables: {
          postId: id,
          input: {
            text: replyText,
          },
        },
      });

      if (data) {
        // reload page components
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
      px: 4,
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
        autoFocus
        helperText={"Limit 2000 characters"}
        {...register("replyText", { required: true, maxLength: 2000 })}
        error={!!errors.replyText}
        disabled={loading}
      />
      {/* TODO: left align the SAVE button on large screens. Below code isn't doing it. */}
      <Stack direction="row" justifyContent={isMobile ? "center" : "end"}>
        <LoadingButton
          loading={loading}
          loadingIndicator="Loading..."
          variant="contained"
          type="submit"
          sx={styles.loadingButton}
          startIcon={error && <ErrorIcon />}
          color={error ? "error" : "primary"}
        >
          Save
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
