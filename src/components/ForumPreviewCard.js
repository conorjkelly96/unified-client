import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { useAuth } from "../contexts/AppProvider";

export const ForumPreviewCard = ({
  id,
  text,
  username,
  college,
  createdAt,
  replyCount,
  tags,
  profileImageUrl,
}) => {
  const { user } = useAuth();

  return (
    <Card sx={{ minWidth: 275, mb: "25px" }}>
      <CardContent>
        <Typography id={id} variant="h5">
          {text}
          {"..."}
        </Typography>

        <List
          sx={{
            width: "100%",
            maxWidth: 720,
          }}
        >
          <ListItem alignItems="flex-start" sx={{ paddingLeft: "0px" }}>
            <ListItemAvatar>
              <Avatar alt={`${username} profile`} src={profileImageUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={user.username === username ? "You" : username}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  ></Typography>
                  {"Posted "}
                  {createdAt}
                </>
              }
            />
          </ListItem>
        </List>

        <Typography variant="body2">
          {replyCount} {"replies"}
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
              sx={{ marginLeft: 1 }}
            >
              View
            </Button>
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
};
