import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { useAuth } from "../contexts/AppProvider";
import { publicLinks, staffLinks, studentLinks } from "./links";

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
  const classes = useStyles();
  const { isLoggedIn, user, setUser, setIsLoggedIn } = useAuth();

  //hook to display drawer component
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        anchor="top"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List className={classes.drawer}>
          {!isLoggedIn &&
            publicLinks.map((link) => (
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to={link.path} className={classes.link}>
                    {link.label}
                  </Link>
                </ListItemText>
              </ListItem>
            ))}
          {isLoggedIn &&
            user?.type === "staff" &&
            staffLinks.map((link) => (
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to={link.path} className={classes.link}>
                    {link.label}
                  </Link>
                </ListItemText>
              </ListItem>
            ))}
          {isLoggedIn &&
            user?.type === "student" &&
            studentLinks.map((link) => (
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to={link.path} className={classes.link}>
                    {link.label}
                  </Link>
                </ListItemText>
              </ListItem>
            ))}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};
