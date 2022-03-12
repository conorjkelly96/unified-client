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

export const CreateJobPage = () => {
  const [executeCreateJob, { loading, error }] = useMutation(CREATE_JOB);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
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
            title: title.toLowerCase().trim(),
            company: company.toLowerCase().trim(),
            description: description.toLowerCase().trim(),
            url: url.toLowerCase(),
            salary,
            closingDate,
          },
        },
      });

      if (data) {
        navigate("/dashboard", { replace: true });
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
      paddingTop: 2,
      paddingBottom: 2,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 4,
    },
    loadingButton: { marginTop: 3, marginBottom: 2 },
    errorContainer: {
      marginTop: 2,
      color: "#d32f2f",
      textAlign: "center",
    },
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6} sx={{ border: "1px solid black" }}>
        <Box sx={styles.container}>
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            align="center"
            sx={styles.header}
          >
            New Job Listing
          </Typography>
          <Divider />
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
            />{" "}
            <TextField
              margin="normal"
              id="description"
              label="Description"
              name="description"
              variant="outlined"
              multiline
              minRows={5}
              fullWidth
              {...register("description", { required: true })}
              error={!!errors.description}
              disabled={loading}
            />
            <TextField
              margin="normal"
              id="url"
              label="Link"
              name="url"
              variant="outlined"
              fullWidth
              {...register("url", { required: true })}
              error={!!errors.url}
              disabled={loading}
            />
            <TextField
              type="number"
              margin="normal"
              id="salary"
              label="Salary"
              name="salary"
              variant="outlined"
              fullWidth
              {...register("salary", { required: true })}
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
      <Grid item xs={12} lg={6} sx={{ border: "1px solid black" }}>
        <JobCard
          title={title}
          description={description}
          company={company}
          url={url}
          salary={salary}
          date={date}
        />
      </Grid>
    </Grid>
  );
};
