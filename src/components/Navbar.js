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
import { publicLinks, staffLinks, studentLinks } from "./links";

export const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoggedIn, user, setUser, setIsLoggedIn } = useAuth();

  const styles = {
    navContainer: {
      alignContent: "center",
      height: "10vh",
      backgroundColor: "#fff",
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
      color: "#000",
      border: "1px solid #fff",
      m: 1,
      "&:hover": {
        border: "1px solid #E57A44",
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

  const renderLogout = () => (
    <Button variant="text" sx={styles.link} onClick={handleLogout}>
      Logout
    </Button>
  );

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar sx={styles.navContainer}>
        <Box sx={styles.logo}>
          {/* WARNING: THE LOGO IS UNSTABLE */}
          <img
            src="/images/unified-public-nav.png"
            alt="Unified Logo"
            style={{
              width: "140px",
              height: "100%",
              padding: "10px",
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
                  <Button
                    key={link.label}
                    variant="text"
                    sx={styles.link}
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
                    sx={styles.link}
                    onClick={handleNavigation(link.path)}
                  >
                    {link.label}
                  </Button>
                ))}
              </>
            )}

            {isLoggedIn && user?.type === "student" && (
              <>
                {studentLinks.map((link) => (
                  <Button
                    variant="text"
                    key={link.label}
                    sx={styles.link}
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
