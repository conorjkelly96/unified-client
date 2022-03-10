import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";
import { MenuItem, Select } from "@mui/material";

import { SIGNUP_STAFF } from "../mutations";
import { COLLEGES, UNIVERSITIES } from "../queries";
import { Spinner } from "./Spinner";

export const StaffSignUpForm = () => {
  const [executeSignUp, { loading, error }] = useMutation(SIGNUP_STAFF);

  const {
    data: universities,
    loading: universitiesLoading,
    error: universitiesError,
  } = useQuery(UNIVERSITIES);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [
    executeGetColleges,
    {
      data: universityData,
      loading: universityLoading,
      error: universityError,
    },
  ] = useLazyQuery(COLLEGES);

  const navigate = useNavigate();

  if (universitiesError || universityError) {
    navigate("/error", { replace: true });
  }

  const onSubmit = async ({
    firstName,
    lastName,
    username,
    email,
    password,
    university,
    college,
  }) => {
    try {
      const { data } = await executeSignUp({
        variables: {
          input: {
            firstName: firstName.toLowerCase().trim(),
            lastName: lastName.toLowerCase().trim(),
            username: username.toLowerCase().trim(),
            email: email.toLowerCase().trim(),
            password,
            university: university.toLowerCase().trim(),
            college: college.toLowerCase().trim(),
          },
        },
      });

      if (data) {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.log(err);
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
    <Box sx={styles.container}>
      {universitiesLoading && <Spinner />}
      {universityLoading && <Spinner />}
      <Typography
        variant="h4"
        gutterBottom
        component="h1"
        align="center"
        sx={styles.header}
      >
        Sign Up
      </Typography>
      <Divider />
      <Box component="form" sx={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          id="firstName"
          label="First Name"
          name="firstName"
          variant="outlined"
          fullWidth
          {...register("firstName", { required: true })}
          error={!!errors.firstName}
          disabled={loading}
        />
        <TextField
          margin="normal"
          id="lastName"
          label="Last Name"
          name="lastName"
          variant="outlined"
          fullWidth
          {...register("lastName", { required: true })}
          error={!!errors.lastName}
          disabled={loading}
        />
        <TextField
          margin="normal"
          id="username"
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          {...register("username", { required: true })}
          error={!!errors.username}
          disabled={loading}
        />
        <TextField
          margin="normal"
          id="email"
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          {...register("email", { required: true })}
          error={!!errors.email}
          disabled={loading}
        />
        <TextField
          type="password"
          margin="normal"
          id="password"
          label="Password"
          name="password"
          variant="outlined"
          fullWidth
          {...register("password", { required: true })}
          error={!!errors.password}
          disabled={loading}
        />
        <Select
          id="university"
          label="University"
          name="university"
          variant="outlined"
          fullWidth
          {...register("university", { required: true })}
          error={!!errors.university}
          disabled={loading}
          sx={{ margin: "16px" }}
          onChange={(event) =>
            executeGetColleges({
              variables: {
                id: event.target.value,
              },
            })
          }
        >
          {universities &&
            universities.universities.map((university) => (
              <MenuItem key={university.id} value={university.id}>
                {university.name}
              </MenuItem>
            ))}
        </Select>
        <Select
          id="college"
          label="College"
          name="college"
          variant="outlined"
          fullWidth
          {...register("college", { required: true })}
          error={!!errors.college}
          disabled={loading}
          sx={{ marginTop: "12px" }}
        >
          {universityData &&
            universityData.colleges.colleges.map((college) => (
              <MenuItem key={college} value={college}>
                {college}
              </MenuItem>
            ))}
        </Select>
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
          Sign Up
        </LoadingButton>

        <Link
          component={RouterLink}
          to="/login"
          variant="body2"
          underline="none"
        >
          Already have an account? Login
        </Link>
        {error && (
          <Typography
            variant="subtitle2"
            gutterBottom
            component="div"
            sx={styles.errorContainer}
          >
            Failed to sign up, please make sure you enter the correct details or
            try again later.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
