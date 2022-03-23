import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { useAuth } from "../contexts/AppProvider";
import { publicLinks, staffLinks, studentLinks } from "./links";
import { Button } from "@mui/material";

//css styling
const useStyles = makeStyles(() => ({
  drawer: {
    backgroundColor: "#1976d2",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
  },
  icon: {
    color: "white",
  },
}));

export const DrawerComponent = () => {
  const { isLoggedIn, user, setUser, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  //hook to display drawer component
  const [openDrawer, setOpenDrawer] = useState(false);

  const styles = {
    navContainer: {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser();
    setIsLoggedIn(false);

    navigate("login", { replace: true });
  };

  const renderLogout = () => (
    <Button
      variant="text"
      sx={{ ...styles.link, mt: 3, textTransform: "none", fontSize: "16px" }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );

  return (
    <>
      <Drawer
        anchor="top"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List sx={styles.navContainer}>
          {!isLoggedIn &&
            publicLinks.map((link) => (
              <Link to={link.path} style={styles.link}>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>{link.label}</ListItemText>
                </ListItem>
              </Link>
            ))}
          {isLoggedIn && user?.type === "staff" && (
            <>
              {staffLinks.map((link) => (
                <Link to={link.path} style={styles.link}>
                  <ListItem onClick={() => setOpenDrawer(false)}>
                    <ListItemText>{link.label}</ListItemText>
                  </ListItem>
                </Link>
              ))}
              {renderLogout()}
            </>
          )}
          {isLoggedIn && user?.type === "student" && (
            <>
              {studentLinks.map((link) => (
                <Link to={link.path} style={styles.link}>
                  <ListItem onClick={() => setOpenDrawer(false)}>
                    <ListItemText>{link.label}</ListItemText>
                  </ListItem>
                </Link>
              ))}
              {renderLogout()}
            </>
          )}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};
