import { hover } from "@testing-library/user-event/dist/hover";

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

// Theme colors: blue(009ffd), light grey(e8e9f3), black(272635), orange(e57a44), red(c1292e)
export const postButton = {
  color: "#fff",
  backgroundColor: "#e57a44",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#f75707",
    boxShadow: "none",
  },
};
