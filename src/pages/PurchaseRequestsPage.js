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

  return (
    itemData &&
    !itemLoading &&
    itemData.getCommentsOnMyItems.map((item, index) => (
      <PreviewItemCard key={index} item={item} />
    ))
  );
};
