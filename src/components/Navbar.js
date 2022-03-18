import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme, useMediaQuery } from "@mui/material";

import { DrawerComponent } from "./Drawer";
import { useAuth } from "../contexts/AppProvider";

export const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoggedIn, user, setUser, setIsLoggedIn } = useAuth();

  const styles = {
    navContainer: {
      backgroundColor: "orange",
      alignContent: "center",
    },
    navLinks: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "flex-end",
    },
    logo: {
      color: "white",
      display: "flex",
      alignContent: "center",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: 20,
      "&:hover": {
        borderBottom: "1px solid white",
      },
    },
  };

  const handleNavigation = (path) => () => {
    navigate(path, { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser();
    setIsLoggedIn(false);

    navigate("login", { replace: true });
  };

  const publicLinks = [
    {
      label: "Login",
      path: "login",
    },
    {
      label: "Sign Up",
      path: "sign-up",
    },
  ];

  const staffLinks = [
    {
      label: "Dashboard",
      path: "dashboard",
    },
    {
      label: "Jobs",
      path: "jobs",
    },
  ];

  const studentLinks = [
    {
      label: "Dashboard",
      path: "dashboard",
    },
    {
      label: "Marketplace",
      path: "marketplace",
    },
  ];

  const renderLogout = () => (
    <Button variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar sx={styles.navContainer}>
        <Box sx={styles.logo}>
          <img
            src="./images/unified-navbar-logo.png"
            alt="Unified Logo"
            style={{
              width: "140px",
              height: "100%",
            }}
          />
        </Box>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <Box sx={styles.navLinks}>
            {!isLoggedIn && (
              <>
                {publicLinks.map((link) => (
                  <Button variant="text" onClick={handleNavigation(link.path)}>
                    {link.label}
                  </Button>
                ))}
              </>
            )}

            {isLoggedIn && user?.type === "staff" && (
              <>
                {staffLinks.map((link) => (
                  <Button variant="text" onClick={handleNavigation(link.path)}>
                    {link.label}
                  </Button>
                ))}
                {renderLogout()}
              </>
            )}

            {isLoggedIn && user?.type === "student" && (
              <>
                {studentLinks.map((link) => (
                  <Button variant="text" onClick={handleNavigation(link.path)}>
                    {link.label}
                  </Button>
                ))}
                {renderLogout()}
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
