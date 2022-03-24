import * as React from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import LandingHeroLayout from "./LandingHeroLayout";

const backgroundImage =
  "https://michiganvirtual.org/wp-content/uploads/2019/07/online-learning-illustration-Converted-1024x384.png";

export const LandingHero = () => {
  return (
    <LandingHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Sell and buy items between students - Converse with your mates - Apply
        for jobs before the public
      </Typography>
      <Button
        variant="contained"
        size="large"
        component="a"
        href="/sign-up/"
        sx={{ minWidth: 200, backgroundColor: "#E57A44" }}
      >
        Register
      </Button>
    </LandingHeroLayout>
  );
};
