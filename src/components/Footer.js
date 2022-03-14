import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const Footer = () => {
  return (
    <>
      <Divider sx={{ marginTop: "50px", marginBottom: "25px" }}></Divider>
      <Stack
        component="footer"
        direction="column"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        marginBottom="20px"
      >
        <IconButton
          href="https://github.com/conorjkelly96/unified-client"
          target="_blank"
        >
          <GitHubIcon fontSize="large" />
        </IconButton>
        <Typography
          component="a"
          href="/about"
          sx={{ textDecoration: "none", color: "black" }}
        >
          <span style={{ fontSize: "1.2rem" }}>©</span> The Unified Team
        </Typography>
      </Stack>
    </>
  );
};
