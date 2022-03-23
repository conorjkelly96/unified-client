import { useNavigate } from "react-router-dom";

import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/about-us", { replace: true });
  };

  return (
    <Box component="footer" sx={{ height: "15vh" }}>
      <Divider />
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={1}
        sx={{ py: 3 }}
      >
        <IconButton
          href="https://github.com/conorjkelly96/unified-client"
          target="_blank"
        >
          <GitHubIcon sx={{ color: "#3EB9E3" }} fontSize="large" />
        </IconButton>
        <Typography onClick={handleNavigation} variant="subtitle2">
          © The Unified Team
        </Typography>
      </Stack>
    </Box>
  );
};
