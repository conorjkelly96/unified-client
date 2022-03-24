import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const Spinner = ({ loading }) => {
  if (!loading) {
    return null;
  }

  return (
    <Backdrop sx={{ color: "#fff", zIndex: 1 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
