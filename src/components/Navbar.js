import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export const Navbar = () => {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab value="login" label="Login" />
        <Tab value="sign-up" label="SignUp" />
        <Tab value="dashboard" label="Dashboard" />
        <Tab value="about-us" label="About Us" />
        <Tab value="job-board" label="Job Board" />
        <Tab value="home" label="Home" />
        <Tab value="buy-sell" label="Buy/Sell" />
        <Tab value="forum-board" label="Forum Board" />
        <Tab value="edit-profile" label="Edit Profile" />
      </Tabs>
    </Box>
  );
};
