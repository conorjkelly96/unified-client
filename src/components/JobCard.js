import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useAuth } from "../contexts/AppProvider";

export const JobCard = ({
  id,
  title,
  description,
  company,
  url,
  salary,
  date,
  onDelete,
}) => {
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
        <Box>
          <Button
            size="small"
            component="a"
            target="_blank"
            href={url}
            sx={{ marginBottom: 2 }}
          >
            {user?.__typename === "Staff" ? "Link" : "Learn More & Apply"}
          </Button>
          {user?.__typename === "Staff" && (
            <Box sx={{ marginBottom: "10px" }}>
              <Button
                variant="contained"
                size="small"
                endIcon={<EditIcon />}
                color="info"
                sx={{ marginLeft: 1 }}
                // onClick={}
              >
                Edit
              </Button>
              <Button
                id={id}
                variant="contained"
                size="small"
                endIcon={<DeleteIcon />}
                color="error"
                sx={{ marginLeft: 1 }}
                onClick={onDelete}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};
