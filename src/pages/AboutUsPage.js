import { Navbar } from "../components/Navbar";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const cards = [1, 2, 3, 4, 5, 6];

const theme = createTheme({});

export const AboutUsPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              <img
                src="./images/unified-public-nav.png"
                alt="Unified Logo"
                style={{
                  width: "310px",
                  height: "100%",
                  padding: "10px",
                }}
              ></img>
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              The team here at Unified are made up of like-minded individuals
              that know what students and teachers need. That's because that's
              who we are. We're an eclectic mix of Alumni, Staff, Students &
              Teachers who've came together to create the perfect platform for
              your current/post Uni needs.
            </Typography>
            <Stack
              sx={{ pt: 5 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#009FFD",
                }}
              >
                <Link
                  to="/about-us"
                  sx={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  About Page
                </Link>
              </Button>
              <Button
                variant="outlined"
                sx={{
                  bgcolor: "white",
                }}
              >
                <Link
                  to="https://github.com/conorjkelly96/unified-client"
                  sx={{
                    textDecoration: "none",
                    color: "#E57A44",
                  }}
                >
                  View Our Github
                </Link>
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md" align="center">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://avatars.githubusercontent.com/u/87938352?v=4"
                    alt="Matthew Palmer"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Matthew Palmer
                    </Typography>
                    <Typography>VA Grad / Coding Bootcamp</Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: "center" }}>
                    <Button size="small">
                      <GitHubIcon color="#E57A44"></GitHubIcon>
                    </Button>
                    <Button size="small">
                      <LinkedInIcon></LinkedInIcon>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};
