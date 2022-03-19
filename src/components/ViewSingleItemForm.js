import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Button, Grid, Modal, Select } from "@mui/material";
import { ItemCard } from "./ItemCard";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import BoltIcon from "@mui/icons-material/Bolt";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SINGLE_ITEM_DATA } from "../queries";
import { useParams } from "react-router-dom";
import { Error } from "../pages/Error";
import { Spinner } from "./Spinner";
import { useState } from "react";
import { ADD_TO_MY_ITEMS } from "../mutations";

export const ViewSingleItemForm = () => {
  const [selectedItem, setSelectedItem] = useState();
  const [interestedItems, setInterestedItems] = useState([]);
  const [executeAddItemToInterested, addItemToInterested] =
    useMutation(ADD_TO_MY_ITEMS);

  let { id } = useParams();

  const {
    loading: itemLoading,
    error: itemError,
    data: itemData,
  } = useQuery(GET_SINGLE_ITEM_DATA, {
    variables: {
      id: id,
    },
  });

  const onContactSeller = (event) => {
    console.log(event.target.id);
    return <Modal />;
  };

  // When a user selects Quick Add To Interested, add the item to their interested array
  const onAddItemToInterested = async (event) => {
    const itemId = event.target.id;
    setSelectedItem(itemId);

    await executeAddItemToInterested({
      variables: {
        itemId: itemId,
      },
    });
  };

  if (itemError) {
    console.log(itemError);
    return <Error />;
  }

  if (itemLoading) {
    return <Spinner />;
  }

  console.log(itemData.getSingleItemData);

  return (
    <Grid container spacing={2} sx={{ maxWidth: 1200, margin: "auto" }}>
      <Grid item xs={12} lg={6}>
        <Divider sx={{ maxWidth: "90%", margin: "auto" }} />
        <Box sx={{ px: "32px", paddingTop: "40px" }}>
          <ItemCard
            itemName={itemData.getSingleItemData.itemName}
            itemDescription={itemData.getSingleItemData.itemDescription}
            category={itemData.getSingleItemData.category}
            condition={itemData.getSingleItemData.condition}
            price={itemData.getSingleItemData.price}
            quantity={itemData.getSingleItemData.price}
          />
          <Grid container spacing={2} sx={{ maxWidth: 1200, margin: "auto" }}>
            <Button
              id={"id"}
              variant="contained"
              size="small"
              endIcon={<ContactSupportIcon />}
              color="success"
              sx={{ marginLeft: "8px" }}
              onClick={onContactSeller}
            >
              Contact Seller
            </Button>
            <Button
              id={"id"}
              variant="contained"
              size="small"
              endIcon={<BoltIcon />}
              color="warning"
              sx={{ marginLeft: "8px" }}
              // onClick={onAddItemToInterested}
            >
              Add To Interested
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
