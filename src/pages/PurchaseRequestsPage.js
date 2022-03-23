import { CommentCard } from "../components/CommentCard";
import Typography from "@mui/material/Typography";
import { GET_COMMENTS_ON_MY_ITEMS } from "../queries";
import { useQuery } from "@apollo/client";
import { Spinner } from "../components/Spinner";
import { PreviewItemCard } from "../components/PreviewItemCard";

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

  // get all the items from back end

  console.log(itemData);

  // const itemDataArray = itemData.getCommentsOnMyItems;
  // console.log(itemDataArray.itemName);

  // const itemCommentsArray = itemDataArray.map((item) => item.comments);

  // const comments = itemCommentsArray.map((item) => item.commentBody);

  // console.log(itemDataArray);

  // send it down and iterate within the card

  return <h1>PurchaseRequestsPage</h1>;
};
