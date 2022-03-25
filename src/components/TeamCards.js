import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const TeamCard = (props) => {
  const { title, subtitle, imageUrl, gitLink, linkedLink } = props;
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
        <Button size="small" href={linkedLink}>
          <LinkedInIcon sx={{ color: "#E79118", fontSize: "2.5rem" }} />
        </Button>
        <Button size="small" href={gitLink}>
          <GitHubIcon sx={{ color: "#21B9E3", fontSize: "2.5rem" }} />
        </Button>
      </CardActions>
    </Card>
  );
};

export default TeamCard;
