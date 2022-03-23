import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const NoItemResults = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography
          sx={{ justifyContent: "center" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          No Results Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try filtering from a different category.
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button size="small">List Item</Button>
      </CardActions>
    </Card>
  );
};
