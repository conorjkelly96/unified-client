import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";

import { CREATE_JOB } from "../mutations";
import { useEffect, useState } from "react";
import { DatePicker } from "../components/DatePicker";
import { JobCard } from "../components/JobCard";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AppProvider";

export const CreateJobPage = () => {
  const [executeCreateJob, { loading, error }] = useMutation(CREATE_JOB);

  const navigate = useNavigate();

  // const { user } = useAuth();
  // const userId = user.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm();

  const title = watch("title", "");
  const description = watch("description", "");
  const company = watch("company", "");
  const url = watch("url", "");
  const salary = watch("salary", "");
  const date = watch("closingDate", "");

  const [closingDate, setClosingDate] = useState("");
  const value = getValues("closingDate");

  useEffect(() => {
    register("closingDate");
  }, [register]);

  useEffect(() => {
    setClosingDate(value || null);
  }, [setClosingDate, value]);

  const onSubmit = async ({
    title,
    company,
    description,
    url,
    salary,
    closingDate,
  }) => {
    try {
      const { data } = await executeCreateJob({
        variables: {
          newJobInput: {
            title: title,
            company: company,
            description: description,
            url: url.toLowerCase(),
            salary,
            closingDate,
          },
        },
      });

      if (data) {
        navigate(`/my-jobs`, { replace: true });
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
    <Grid container spacing={2} sx={{ maxWidth: 1200, margin: "auto" }}>
      <Grid item xs={12} lg={6}>
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            align="center"
            sx={styles.header}
          >
            New Job Listing
          </Typography>
          <Divider sx={{ maxWidth: "90%", margin: "auto" }} />
          <Box
            component="form"
            sx={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              margin="normal"
              id="title"
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              autoFocus
              {...register("title", { required: true })}
              error={!!errors.title}
              disabled={loading}
            />
            <TextField
              margin="normal"
              id="company"
              label="Company"
              name="company"
              variant="outlined"
              fullWidth
              {...register("company", { required: true })}
              error={!!errors.company}
              disabled={loading}
            />
            <TextField
              margin="normal"
              id="description"
              label="Description"
              name="description"
              variant="outlined"
              multiline
              minRows={5}
              fullWidth
              helperText={"Limit 2000 characters"}
              {...register("description", { required: true, maxLength: 2000 })}
              error={!!errors.description}
              disabled={loading}
            />
            <TextField
              margin="normal"
              id="url"
              label="Link to Full Post"
              name="url"
              variant="outlined"
              fullWidth
              {...register("url", { required: true })}
              error={!!errors.url}
              disabled={loading}
            />
            <TextField
              margin="normal"
              id="salary"
              label="Salary"
              name="salary"
              variant="outlined"
              fullWidth
              helperText={!!errors.salary ? "Enter a number" : ""}
              {...register("salary", {
                required: true,
                validate: (value) => {
                  const regex = new RegExp(/^\d*\.?\d*$/);
                  return regex.test(value);
                },
              })}
              error={!!errors.salary}
              disabled={loading}
            />
            <DatePicker
              date={closingDate}
              setDate={setClosingDate}
              setValue={setValue}
              loading={loading}
              register={register}
              errors={errors}
              name="closingDate"
              label="Closing Date"
              // TODO: minDate prop to restrict selection to only future dates isn't working
              minDate={new Date()}
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
              Save
            </LoadingButton>
            {error && (
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={styles.errorContainer}
              >
                Failed to create a job.
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography
          variant="h4"
          gutterBottom
          component="h1"
          align="center"
          sx={styles.header}
        >
          Preview
        </Typography>
        <Divider sx={{ maxWidth: "90%", margin: "auto" }} />
        <Box sx={{ px: "32px", paddingTop: "40px" }}>
          <JobCard
            title={title}
            description={description}
            company={company}
            url={url}
            salary={salary}
            date={date}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
