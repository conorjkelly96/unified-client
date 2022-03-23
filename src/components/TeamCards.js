import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const TeamCard = (props) => {
  const { title, description, subtitle, imageUrl } = props;
  return (
    <Card>
      <CardMedia
        style={{ height: "300px", maxWidth: "auto" }}
        image={imageUrl}
      />
      <CardContent style={{ padding: "30px" }}>
        <Typography variant="body1" component="h1">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {subtitle}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center", padding: "20px" }}>
        <Button size="small">
          <LinkedInIcon />
        </Button>
        <Button size="small">
          <GitHubIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default TeamCard;
