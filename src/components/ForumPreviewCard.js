import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const ForumPreviewCard = ({
  id,
  text,
  username,
  college,
  createdAt,
  replies,
}) => {
  return (
    <Card sx={{ minWidth: 275, mb: "25px" }}>
      <CardContent>
        <Typography id={id} variant="h5">
          {text}
          {"..."}
        </Typography>

        <Typography color="text.secondary" sx={{ mt: "8px", mb: "5px" }}>
          {username}
          {college ? ", " : ""}
          {college || " "}
          {" posted "}
          {createdAt}
        </Typography>

        <Typography variant="body2">
          {replies.length} {"replies"}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction={"row"} sx={{ justifyContent: "center" }}>
          <Box sx={{ marginBottom: "10px" }}>
            <Button
              size="small"
              component="a"
              variant="contained"
              color="info"
              href={`/forum/${id}`}
              sx={{ marginLeft: "8px" }}
            >
              View
            </Button>
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
};
