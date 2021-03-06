import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import ImageFadeIn from "react-image-fade-in";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const LandingHeroLayoutRoot = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  position: "relative",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    height: "80vh",
    minHeight: 500,
    maxHeight: 1300,
  },
}));

const Background = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2,
});

function LandingHeroLayout(props) {
  const { sxBackground, children } = props;

  return (
    <LandingHeroLayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ImageFadeIn
          loadAsBackgroundImage={false}
          opacityTransition={3}
          src="./images/unified-private-nav.png"
          width="400px"
          height="auto"
        />
        {children}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "common.black",
            opacity: 0.35,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
      </Container>
    </LandingHeroLayoutRoot>
  );
}

LandingHeroLayout.propTypes = {
  children: PropTypes.node,
  sxBackground: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default LandingHeroLayout;
