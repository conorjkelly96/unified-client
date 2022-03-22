import { CommentCard } from "../components/CommentCard";
import Typography from "@mui/material/Typography";

export const PurchaseRequestsPage = () => {
  const comments = ["one", "two", "three"];
  const username = "gangstarr";

  return comments?.length > 0 ? (
    <CommentCard comments={comments} username={username} />
  ) : (
    <Typography>Commments</Typography>
  );
};
