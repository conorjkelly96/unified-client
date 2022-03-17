import { useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ItemCard } from "../components/ItemCard";
import { VIEW_ALL_ITEMS } from "../queries";
import { DELETE_ITEM } from "../mutations";

export const Marketplace = () => {
  const {
    data: itemData,
    loading: itemLoading,
    error: itemError,
    refetch,
  } = useQuery(VIEW_ALL_ITEMS);

  //  filter out items which belong to me
  // const myItems = itemData.filter((item) => console.log(item));

  const myItems = (itemData) => {
    console.log(itemData);
  };

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "[]");

  console.log(loggedInUser.id);

  myItems(itemData);

  const [executeDeleteItem, { loading, error }] = useMutation(DELETE_ITEM);

  const [viewMyItems, setViewItemType] = useState("myItems");

  const handleChange = (event, value) => {
    setViewItemType(value);
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
          value={viewMyItems}
          exclusive
          onChange={handleChange}
          sx={{ margin: "25px" }}
        >
          <ToggleButton value="myItems">My Items</ToggleButton>
          <ToggleButton value="allItems">All Items</ToggleButton>
        </ToggleButtonGroup>
        {viewMyItems === "myItems"}
        {viewMyItems === "allItems"}
      </Container>
      <Divider sx={{ maxWidth: "90%", margin: "auto" }} />
      <Box sx={{ px: "32px", paddingTop: "40px" }}>
        {itemData?.viewAllItems?.map((item) => {
          return (
            <ItemCard
              // id={id}
              itemName={item.itemName}
              itemDescription={item.itemDescription}
              category={item.category}
              status={item.status}
              condition={item.condition}
              price={item.price}
              quantity={item.quantity}
              seller={item.seller}
              onDelete={onDelete}
              key={item.id}
            />
          );
        })}
      </Box>
    </>
  );
};
