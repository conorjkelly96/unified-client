export const CreateItemForm = () => {
  const { setIsLoggedIn, setUser } = useAuth();
  const [executeLogin, { loading, error }] = useMutation(LOGIN_STAFF);

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
      const { token, staff } = data.loginStaff;

      localStorage.setItem("token", token);
      localStorage.setItem("staff", JSON.stringify(staff));

      setIsLoggedIn(true);
      setUser({
        id: staff.id,
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        username: staff.username,
        university: staff.university,
        college: staff.college,
      });

      navigate("/dashboard", { replace: true });
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

  //   input CreateItemInput {
  //     itemName: String!
  //     itemDescription: String!
  //     category: String!
  //     condition: String!
  //     price: Int!
  //     quantity: Int
  //     images: [String]
  //   }

  return (
    <Box sx={styles.container}>
      <Typography
        variant="h4"
        gutterBottom
        component="h1"
        align="center"
        sx={styles.header}
      >
        Login
      </Typography>
      <Divider />
      <Box component="form" sx={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          sx={styles.loadingButton}
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
            sx={styles.errorContainer}
          >
            Failed to login, please enter valid email address and/or password.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
