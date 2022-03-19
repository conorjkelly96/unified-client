import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ItemCard } from "../components/ItemCard";
import { VIEW_ALL_ITEMS, VIEW_MY_ITEMS_FOR_SALE } from "../queries";
import { DELETE_ITEM } from "../mutations";

export const Marketplace = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("allItems");
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [interestedItems, setInterestedItems] = useState([]);

  const {
    data: itemData,
    loading: itemLoading,
    error: itemError,
    refetch,
  } = useQuery(VIEW_ALL_ITEMS);

  const [getMyItems, { loading: myItemsLoading, error: myItemsError }] =
    useLazyQuery(VIEW_MY_ITEMS_FOR_SALE);

  const [executeDeleteItem, { loading, error }] = useMutation(DELETE_ITEM);

  useEffect(() => {
    if (
      !itemLoading &&
      itemData?.viewAllItems &&
      selectedValue === "allItems"
    ) {
      setItemsToDisplay(itemData?.viewAllItems);
    }
  }, [itemData, selectedValue]);

  const handleChange = async (event, value) => {
    setSelectedValue(value);
    if (value === "allItems") {
      refetch();
    }

    if (value === "myItems") {
      const { data: myItemsData } = await getMyItems();

      setItemsToDisplay(myItemsData?.viewMyItems);
    }
  };

  // Delete an Item if the user created the listing
  const onDelete = async (event) => {
    const itemId = event.target.id;
    try {
      const { data: deleteData, error: deleteError } = await executeDeleteItem({
        variables: {
          itemId,
        },
      });
      if (deleteError) {
        throw new Error("something went wrong!");
      }

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // redirect to the single item page
  const viewListing = (event) => () => {
    console.log(event);
    const itemId = event.target.id;
    navigate(`listing/${itemId}`, { replace: true });
  };

  // create function to handle a quick 'add to interested' item
  const handleAddToInterested = async (itemId) => {
    // find the item in `interestedItems` state by the matching id
    const itemToSave = interestedItems.find((item) => item.id === itemId);

    console.log(itemToSave);

    // check if the user is logged in

    try {
      // send a response to the back end to add an item to the interested items array
      // if item successfully saves to user's account, return success
    } catch (err) {
      console.error(err);
    }
  };

  const styles = {
    container: { textAlign: "center" },
  };

  return (
    <>
      <Container component={"main"} maxWidth={"xs"} sx={styles.container}>
        <ToggleButtonGroup
          color="primary"
          value={selectedValue}
          exclusive
          onChange={handleChange}
          sx={{ margin: "25px" }}
        >
          <ToggleButton value="myItems">My Items</ToggleButton>
          <ToggleButton value="allItems">All Items</ToggleButton>
        </ToggleButtonGroup>
      </Container>
      <Divider sx={{ maxWidth: "90%", margin: "auto" }} />
      <Box sx={{ px: "32px", paddingTop: "40px" }}>
        {!myItemsLoading &&
          !itemLoading &&
          itemsToDisplay?.map((item) => {
            return (
              <ItemCard
                id={item.id}
                itemName={item.itemName}
                itemDescription={item.itemDescription}
                category={item.category}
                status={item.status}
                condition={item.condition}
                price={item.price}
                quantity={item.quantity}
                seller={item.seller.username}
                onDelete={onDelete}
                key={item.id}
                viewListing={viewListing}
                handleAddToInterested={handleAddToInterested}
              />
            );
          })}
      </Box>
    </>
  );
};
