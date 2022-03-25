import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
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
          <LinkedInIcon sx={{ color: "#E79118" }} />
        </Button>
        <Button size="small" href={gitLink}>
          <GitHubIcon sx={{ color: "#21B9E3" }} />
        </Button>
      </CardActions>
    </Card>
  );
};

export default TeamCard;
