import { CommentCard } from "../components/CommentCard";
import Typography from "@mui/material/Typography";
import { GET_COMMENTS_ON_MY_ITEMS } from "../queries";
import { useQuery } from "@apollo/client";
import { Spinner } from "../components/Spinner";
import { PreviewItemCard } from "../components/PreviewItemCard";
import Box from "@mui/material/Box";

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

  return (
    itemData &&
    !itemLoading &&
    itemData.getCommentsOnMyItems.map((item) => (
      <Box sx={{ height: "75vh" }}>
        <PreviewItemCard key={item.id} item={item} />
      </Box>
    ))
  );
};
