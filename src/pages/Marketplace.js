import { useState } from "react";
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
  const {
    data: itemData,
    loading: itemLoading,
    error: itemError,
    refetch,
  } = useQuery(VIEW_ALL_ITEMS);

  let displayedItems = itemData?.viewAllItems;

  console.log(displayedItems);

  const [getMyItems] = useLazyQuery(VIEW_MY_ITEMS_FOR_SALE);

  const [executeDeleteItem, { loading, error }] = useMutation(DELETE_ITEM);

  // const [viewMyItems, setViewItemType] = useState("allItems");

  let selectedValue = "allItems";
  console.log(selectedValue);

  const handleChange = (event, value) => {
    // setViewItemType(value);
    console.log("VALUE SELECTED ON CLICK", value);
    selectedValue = value;
    if (selectedValue === "allItems") {
      refetch();
      displayedItems = itemData.viewAllItems;
    }

    if (selectedValue === "myItems") {
      const {
        data: myItemsData,
        loading: myItemsLoading,
        error: myItemsError,
      } = getMyItems();

      console.log(myItemsData);

      displayedItems = myItemsData?.viewMyItems;
    }
  };

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
        {displayedItems?.viewAllItems?.map((item) => {
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
            />
          );
        })}
      </Box>
    </>
  );
};
