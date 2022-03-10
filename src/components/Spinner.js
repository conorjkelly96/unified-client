import { Backdrop, CircularProgress } from "@mui/material";

export const Spinner = () => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 1 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
