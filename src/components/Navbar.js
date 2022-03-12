import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

import { DrawerComponent } from "./Drawer";

//css style navbar
const useStyles = makeStyles({
  navlinks: {
    marginLeft: 15,
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
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

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Unified Logo
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/about" className={classes.link}>
              About Us
            </Link>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
            <Link to="/sign-up" className={classes.link}>
              Sign Up
            </Link>
            <Link to="/dashboard" className={classes.link}>
              Dashboard
            </Link>
            <Link to="/job-board" className={classes.link}>
              Job Board
            </Link>
            <Link to="/buy-sell" className={classes.link}>
              Buy/Sell
            </Link>
            <Link to="/forum-board" className={classes.link}>
              Forum Board
            </Link>
            <Link to="/edit-profile" className={classes.link}>
              Edit Profile
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
