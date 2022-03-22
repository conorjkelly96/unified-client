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
      alignContent: "center",
    },
    navLinks: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "flex-end",
    },
    logo: {
      display: "flex",
      alignContent: "center",
    },
    link: {
      textDecoration: "none",
      fontSize: "20px",
      "&:hover": {
        border: "1px solid white",
      },
    },
  };

  const staffStyles = {
    navContainer: {
      backgroundColor: "#E57A44",
    },
    link: {
      color: "white",
    },
    button: {
      backgroundColor: "#009FFD",
      color: "white",
      marginLeft: "10px",
      "&:hover": {
        border: "1px solid white",
        backgroundColor: "#009FFD",
        color: "white",
      },
    },
  };

  const studentStyles = {
    navContainer: {
      backgroundColor: "#009FFD",
    },
    link: {
      color: "white",
    },
    button: {
      backgroundColor: "#E57A44",
      color: "white",
      marginLeft: "10px",
      "&:hover": {
        border: "1px solid white",
        backgroundColor: "#009FFD",
        color: "white",
      },
    },
  };

  const publicStyles = {
    navContainer: {
      backgroundColor: "white",
    },
    link: {
      color: "black",
    },
    button: {
      backgroundColor: "#009FFD",
      color: "",
      marginLeft: "",
      "&:hover": {
        border: "1px solid black",
        backgroundColor: "#009FFD",
        color: "black",
      },
    },
  };

  const handleNavStyles = (element) => {
    if (isLoggedIn && user?.type === "student") {
      return {
        ...styles[element],
        ...studentStyles[element],
      };
    }

    if (isLoggedIn && user?.type === "staff") {
      return {
        ...styles[element],
        ...staffStyles[element],
      };
    }
    if (!isLoggedIn) {
      return {
        ...styles[element],
        ...publicStyles[element],
      };
    }
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
    <Button
      variant="outlined"
      sx={handleNavStyles("button")}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar sx={handleNavStyles("navContainer")}>
        <Box sx={styles.logo}>
          {isLoggedIn ? (
            <img
              src="./images/unified-private-nav.png"
              alt="Unified Logo"
              style={{
                width: "140px",
                height: "100%",
                padding: "10px",
              }}
            />
          ) : (
            // TO DO: Add public landing image here
            <img
              src="./images/unified-public-nav.png"
              alt="Unified Logo"
              style={{
                width: "140px",
                height: "100%",
                padding: "10px",
              }}
            />
          )}
        </Box>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <Box sx={styles.navLinks}>
            {!isLoggedIn && (
              <>
                {publicLinks.map((link) => (
                  <Button
                    key={link.label}
                    variant="text"
                    sx={handleNavStyles("link")}
                    onClick={handleNavigation(link.path)}
                  >
                    {link.label}
                  </Button>
                ))}
              </>
            )}

            {isLoggedIn && user?.type === "staff" && (
              <>
                {staffLinks.map((link) => (
                  <Button
                    variant="text"
                    key={link.label}
                    sx={handleNavStyles("link")}
                    onClick={handleNavigation(link.path)}
                  >
                    {link.label}
                  </Button>
                ))}
                {renderLogout()}
              </>
            )}

            {isLoggedIn && user?.type === "student" && (
              <>
                {studentLinks.map((link) => (
                  <Button
                    variant="text"
                    key={link.label}
                    sx={handleNavStyles("link")}
                    onClick={handleNavigation(link.path)}
                  >
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
