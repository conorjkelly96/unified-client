import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

export const JobCard = ({ title, description, company, url, salary, date }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom component="h1" align="center">
        Preview
      </Typography>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {title || "JOB TITLE"}
          </Typography>
          <Typography color="text.secondary">{company || "COMPANY"}</Typography>
          <Typography sx={{ mb: 1.5 }}>
            {"Starting salary: £"}
            {salary}
            {"/hr"}
          </Typography>
          <Typography variant="body2">
            {description || "DESCRIPTION"}
          </Typography>

          <Typography color="text.secondary">
            {date ? format(date, "MM/dd/yyyy") : "CLOSING DATE"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" component="a" target="_blank" href={url}>
            Learn More & Apply
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
