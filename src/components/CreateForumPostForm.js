import { useMutation, useQuery } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { useNavigate } from "react-router-dom";
import { CREATE_FORUM_POST } from "../mutations";
import { TAGS } from "../queries";
import { Spinner } from "./Spinner";
import { Error } from "../pages/Error";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CreateForumPostForm = () => {
  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useQuery(TAGS);

  const [executeCreateForumPost, { loading, error }] =
    useMutation(CREATE_FORUM_POST);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ postText, tags }) => {
    try {
      const { data } = await executeCreateForumPost({
        variables: {
          forumPost: {
            postText,
            tags,
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

  if (tagsLoading) {
    return (
      <Box sx={{ height: "500px" }}>
        <Spinner />
      </Box>
    );
  }

  if (tagsError) {
    return <Error />;
  }

  const options = tagsData?.tags.map((tag) => tag.name);

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
      <Controller
        control={control}
        name="tags"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            fullWidth
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                margin="normal"
                variant="outlined"
                onChange={onChange}
                value={value}
              />
            )}
            onChange={(event, values, reason) => onChange(values)}
            value={value || []}
          />
        )}
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
