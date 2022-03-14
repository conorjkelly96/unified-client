import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../contexts/AppProvider";

export const JobCard = ({ title, description, company, url, salary, date }) => {
  const { user } = useAuth();

  return (
    <Card sx={{ minWidth: 275, mb: "25px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title || "JOB TITLE"}
        </Typography>

        <Typography color="text.secondary">{company || "COMPANY"}</Typography>

        <Typography sx={{ mb: 1.5 }}>
          {"Starting salary: £"}
          {salary}
        </Typography>

        <Typography variant="body2" sx={{ mb: "15px" }}>
          {description || "DESCRIPTION"}
        </Typography>

        <Typography>
          {"Closing Date: "}
          {date ? format(date, "MM/dd/yyyy") : "CLOSING DATE"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          component="a"
          target="_blank"
          href={url}
        >
          Learn More & Apply
        </Button>
        {user?.__typename === "Staff" && (
          <Button
            variant="contained"
            size="small"
            href={url}
            endIcon={<DeleteIcon />}
            color="error"
            onClick={}
          >
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
