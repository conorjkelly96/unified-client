import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

import { DrawerComponent } from "./Drawer";
import { useAuth } from "../contexts/AppProvider";

//css style navbar
const useStyles = makeStyles({
  navlinks: {
    marginLeft: 15,
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
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
});

export const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { isLoggedIn, user } = useAuth();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography
          variant="h4"
          component="a"
          href="/login"
          className={classes.logo}
        >
          Unified Logo
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            {/* Let's link the about in a footer instead */}
            {/* <Link to="/about" className={classes.link}>
              About Us
            </Link> */}

            {!isLoggedIn && (
              <>
                <Link to="/login" className={classes.link}>
                  Login
                </Link>
                <Link to="/sign-up" className={classes.link}>
                  Sign Up
                </Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link to="/dashboard" className={classes.link}>
                  Dashboard
                </Link>
                <Link to="/jobs" className={classes.link}>
                  Jobs
                </Link>
                <Link to="/marketplace" className={classes.link}>
                  Marketplace
                </Link>
                <Link to="/forum" className={classes.link}>
                  Forum
                </Link>
              </>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
