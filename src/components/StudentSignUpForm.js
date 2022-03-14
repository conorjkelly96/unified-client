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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { SIGNUP_STUDENT } from "../mutations";
import { COLLEGES, UNIVERSITIES } from "../queries";
import { Spinner } from "./Spinner";
import { useRef, useState } from "react";

export const StudentSignUpForm = () => {
  const [executeSignUp, { loading, error }] = useMutation(SIGNUP_STUDENT);
  const [showColleges, setShowColleges] = useState(false);

  const {
    data: universities,
    loading: universitiesLoading,
    error: universitiesError,
  } = useQuery(UNIVERSITIES);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const [
    executeGetColleges,
    {
      data: universityData,
      loading: universityLoading,
      error: universityError,
    },
  ] = useLazyQuery(COLLEGES);

  const navigate = useNavigate();

  // if (universitiesError || universityError) {
  //   navigate("/error", { replace: true });
  // }

  const onSubmit = async ({
    firstName,
    lastName,
    username,
    email,
    password,
    bio,
    interests,
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
            bio: bio.toLowerCase().trim(),
            interests: interests.toLowerCase.trim(),
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
  console.log(universityData);
  return (
    <Box sx={styles.container}>
      {(universitiesLoading || universityLoading) && <Spinner />}
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
        <TextField
          type="password"
          margin="normal"
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          variant="outlined"
          fullWidth
          {...register("confirmPassword", {
            required: true,
            validate: (value) => {
              const { password } = getValues();
              return password === value || "Passwords should match!";
            },
          })}
          error={!!errors.confirmPassword}
          disabled={loading}
        />
        <TextField
          margin="normal"
          id="bio"
          label="Bio"
          name="bio"
          variant="outlined"
          fullWidth
          {...register("bio", { required: true })}
          error={!!errors.bio}
          disabled={loading}
        />
        <FormControl fullWidth>
          <InputLabel id="interests" sx={{ margin: "16px 0px" }}>
            Interests
          </InputLabel>
          <Select
            id="interests"
            label="Interests"
            name="interests"
            variant="outlined"
            fullWidth
            {...register("interests", { required: true })}
            error={!!errors.interests}
            disabled={loading}
            sx={{ margin: "16px 0px" }}
          >
            <MenuItem key={"travelling"} value={"travelling"}>
              {"travelling"}
            </MenuItem>
            <MenuItem key={"exercise"} value={"exercise"}>
              {"exercise"}
            </MenuItem>
            <MenuItem key={"movies"} value={"movies"}>
              {"movies"}
            </MenuItem>
            <MenuItem key={"dancing"} value={"dancing"}>
              {"dancing"}
            </MenuItem>
            <MenuItem key={"cooking"} value={"cooking"}>
              {"cooking"}
            </MenuItem>
            <MenuItem key={"outdoors"} value={"outdoors"}>
              {"outdoors"}
            </MenuItem>
            <MenuItem key={"politics"} value={"politics"}>
              {"politics"}
            </MenuItem>
            <MenuItem key={"pets"} value={"pets"}>
              {"pets"}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="university" sx={{ margin: "16px 0px" }}>
            University
          </InputLabel>
          <Select
            id="university"
            label="University"
            name="university"
            variant="outlined"
            fullWidth
            {...register("university", { required: true })}
            error={!!errors.university}
            disabled={loading}
            sx={{ margin: "16px 0px" }}
            onChange={async (event) => {
              await executeGetColleges({
                variables: {
                  id: event.target.value,
                },
              });

              setShowColleges(true);
            }}
          >
            {universities &&
              universities.universities.map((university) => (
                <MenuItem key={university.id} value={university.id}>
                  {university.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {showColleges &&
          !universityLoading &&
          universityData?.colleges?.colleges && (
            <FormControl fullWidth>
              <InputLabel id="college" sx={{ margin: "16px 0px" }}>
                College
              </InputLabel>
              <Select
                id="college"
                label="College"
                name="college"
                variant="outlined"
                fullWidth
                {...register("college", { required: true })}
                error={!!errors.college}
                disabled={loading}
                sx={{ margin: "16px 0px" }}
              >
                {universityData &&
                  universityData.colleges.colleges.map((college) => (
                    <MenuItem key={college} value={college}>
                      {college}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
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
