import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";

import { LOGIN_STUDENT } from "../mutations";
import { useAuth } from "../contexts/AppProvider";
import { loginForm, postButton } from "../styles";

export const StudentLoginForm = () => {
  const { setIsLoggedIn, setUser } = useAuth();
  const [executeLogin, { loading, error }] = useMutation(LOGIN_STUDENT);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    const { data } = await executeLogin({
      variables: {
        input: {
          email: email.toLowerCase().trim(),
          password,
        },
      },
    });

    if (data) {
      const { token, user } = data.loginStudent;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setIsLoggedIn(true);
      setUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        university: user.university,
        college: user.college,
        type: user.type,
      });

      navigate("/forum", { replace: true });
    }
  };

  return (
    <Box sx={loginForm.container}>
      <Typography
        variant="h4"
        gutterBottom
        component="h1"
        align="center"
        sx={loginForm.header}
      >
        Student Login
      </Typography>
      <Divider />
      <Box
        component="form"
        sx={loginForm.form}
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <LoadingButton
          loading={loading}
          loadingIndicator="Loading..."
          variant="contained"
          fullWidth
          type="submit"
          sx={loading ? loginForm.loadingButton : { ...postButton, m: 2 }}
          startIcon={error && <ErrorIcon />}
          color={error ? "error" : "primary"}
        >
          Login
        </LoadingButton>
        <Link
          component={RouterLink}
          to="/sign-up"
          variant="body2"
          underline="none"
        >
          Don't have an account? Sign Up
        </Link>
        {error && (
          <Typography
            variant="subtitle2"
            gutterBottom
            component="div"
            sx={loginForm.errorContainer}
          >
            Failed to login, please enter valid email address and/or password.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
