export const mainContainer = {
  my: 3,
  backgroundColor: "#fff",
  boxShadow:
    "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
};

export const loginForm = {
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

export const alertContainer = {
  justifyContent: "center",
  p: 4,
  m: 4,
};

export const pageHeader = {
  mt: 6,
  mb: 3,
  justifyContent: "center",
  width: "100%",
};

// Unified Theme colors: blue(009ffd), light grey(e8e9f3), black(272635), orange(e57a44), red(c1292e)

export const postButton = {
  color: "#fff",
  backgroundColor: "#e57a44",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#f75707",
    boxShadow: "none",
  },
};

export const altButton = {
  color: "#fff",
  backgroundColor: "#009ffd",
  "&:hover": {
    backgroundColor: "#0069fd",
    boxShadow: "none",
  },
};

const navbarBackgroundColors = {
  staff: "orange",
  student: "green",
  public: "#fff",
};

const navbarTextColors = {
  staff: "#fff",
  student: "#fff",
  public: "#000",
};

export const getNavbarStyles = (user) => {
  return {
    navContainer: {
      backgroundColor: navbarBackgroundColors[user] || "#fff",
    },
    button: {
      border: "none",
      backgroundColor: navbarBackgroundColors[user] || "#fff",
      color: navbarTextColors[user] || "#000",
      marginLeft: "10px",
      "&:hover": {
        border: `1px solid ${navbarTextColors[user] || "#000"}`,
        color: navbarTextColors[user] || "#000",
      },
    },
  };
};
