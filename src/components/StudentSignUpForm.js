import { useRef, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { postButton } from "../styles";

import { SIGNUP_STUDENT } from "../mutations";
import { COLLEGES, UNIVERSITIES } from "../queries";
import { Spinner } from "./Spinner";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const options = [
  "Travelling",
  "Exercise",
  "Movies",
  "Dancing",
  "Cooking",
  "Outdoors",
  "Politics",
  "Pets",
];

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
    control,
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
    university,
    college,
    interests,
    bio,
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
            interests: interests,
            university: university.toLowerCase().trim(),
            bio: bio.trim(),
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

  console.log(errors);

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
        Student Sign Up
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
            validate: (value) => getValues("password") === value,
          })}
          error={!!errors.confirmPassword}
          disabled={loading}
          helperText={errors.confirmPassword ? "Passwords do not match" : ""}
        />
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
        <TextField
          multiline
          rows={5}
          margin="normal"
          id="bio"
          label="Bio"
          name="bio"
          variant="outlined"
          fullWidth
          helperText="Maximum 2000 characters"
          {...register("bio", { required: true, maxLength: 2000 })}
          error={!!errors.bio}
          disabled={loading}
        />
        <Controller
          control={control}
          name="interests"
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
                  label="Interests"
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
        {/* <Controller
          onChange={([event, data]) => {
            return data;
          }}
          name="interests"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              multiple
              fullWidth
              id="interests-multi-select"
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
                  margin="normal"
                  id="interests"
                  label="Interests"
                  name="interests"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "disabled",
                  }}
                  onChange={onChange}
                  // {...register("interests", { required: true })}
                  // error={!!errors.interests}
                  // disabled={loading}
                />
              )}
              onChange={(event, values, reason) => onChange(values)}
              value={value}
            />
          )}
        /> */}
        <LoadingButton
          loading={loading}
          loadingIndicator="Loading..."
          variant="contained"
          fullWidth
          type="submit"
          sx={loading ? styles.loadingButton : { ...postButton, m: 2 }}
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
