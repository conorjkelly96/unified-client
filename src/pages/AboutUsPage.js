import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Content from "../components/TeamContent";

const theme = createTheme({});

export const AboutUsPage = () => {
  return (
    <>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="primary"
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
              sx={{ color: "black" }}
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
              <Button variant="outlined">
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
        <box>
          <Typography
            variant="h2"
            component="h2"
            textAlign={"center"}
            padding="20px"
          >
            Meet the Team
          </Typography>
          ;
          <Container sx={{ py: 10 }} maxWidth="lg" align="center">
            {/* End hero unit */}
            <Grid container direction="column">
              <Grid item container>
                <Grid sm={2} xs={0} />
                <Grid xs={12} sm={8}>
                  <Content sx={{ padding: "10px" }} />
                </Grid>
                <Grid item xs={6} />
              </Grid>
            </Grid>
          </Container>
        </box>
      </main>
    </>
  );
};
