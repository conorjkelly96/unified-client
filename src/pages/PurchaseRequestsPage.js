import { CommentCard } from "../components/CommentCard";
import Typography from "@mui/material/Typography";
import { GET_COMMENTS_ON_MY_ITEMS } from "../queries";
import { useQuery } from "@apollo/client";
import { Spinner } from "../components/Spinner";

export const PurchaseRequestsPage = () => {
  const {
    loading: itemLoading,
    error: itemError,
    data: itemData,
  } = useQuery(GET_COMMENTS_ON_MY_ITEMS);

  if (itemError) {
    console.log(itemError);
  }

  if (itemLoading) {
    return <Spinner />;
  }

  const comments = itemData.getCommentsOnMyItems.map((item) => {
    return item.map((item) => console.log(item));
  });

  console.log(comments);

  return <h1>Purchase Requests</h1>;

  // return comments?.length > 0 ? (
  //   <CommentCard comments={comments} username={username} />
  // ) : (
  //   <Typography>Commments</Typography>
  // );
};