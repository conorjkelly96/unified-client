import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Button, Divider, FormControl, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ItemCard } from "../components/ItemCard";
import SellIcon from "@mui/icons-material/Sell";
import StoreIcon from "@mui/icons-material/Store";
import {
  VIEW_ALL_ITEMS,
  VIEW_MY_ITEMS_FOR_SALE,
  GET_ITEMS_BY_CATEGORY,
} from "../queries";
import { ADD_TO_MY_ITEMS, DELETE_ITEM } from "../mutations";
import { useAuth } from "../contexts/AppProvider";
import { FilterByCategoryComponent } from "../components/FilterByCategoryComponent";

export const Marketplace = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("allItems");
  const [selectedCategoryValue, setSelectedCategoryValue] = useState(
    "Clothing & Accessories"
  );
  const [selectedItem, setSelectedItem] = useState();
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const { user } = useAuth();

  const [executeAddItemToInterested, addItemToInterested] =
    useMutation(ADD_TO_MY_ITEMS);

  const {
    data: itemData,
    loading: itemLoading,
    error: itemError,
    refetch,
  } = useQuery(VIEW_ALL_ITEMS);

  const [getMyItems, { loading: myItemsLoading, error: myItemsError }] =
    useLazyQuery(VIEW_MY_ITEMS_FOR_SALE);

  // const [
  //   getItemsByCategory,
  //   { loading: itemsByCategoryLoading, error: itemsByCategoryError },
  // ] = useLazyQuery(GET_ITEMS_BY_CATEGORY);

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

  const handleItemViewChange = async (event, value) => {
    setSelectedValue(value);
    if (value === "allItems") {
      refetch();
    }

    if (value === "myItems") {
      const { data: myItemsData } = await getMyItems();

      setItemsToDisplay(myItemsData?.viewMyItems);
    }
  };

  const handleCategoryViewChange = async (event, value) => {
    setSelectedCategoryValue(value.props.value);
    // const { data: itemsByCategoryData } = await getItemsByCategory(
    //   value.props.value
    // );

    // console.log(itemsByCategoryData);

    // setItemsToDisplay(myItemsData?.viewMyItems);
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

  // Pass this down with the seller id so we can match them off and conditionally render buttons on the item card
  const userId = user.id;

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
          onChange={handleItemViewChange}
          sx={{ margin: "25px" }}
        >
          <ToggleButton value="myItems">My Items</ToggleButton>
          <ToggleButton value="allItems">All Items</ToggleButton>
        </ToggleButtonGroup>
        {selectedValue === "myItems" && (
          <Box sx={{ px: "32px", padding: "20px" }}>
            <Button
              endIcon={<SellIcon />}
              color="secondary"
              href="/create-item"
            >
              Sell an item today!
            </Button>
            <Button
              endIcon={<StoreIcon />}
              color="secondary"
              href="/purchase-requests"
            >
              View Purchase Requests
            </Button>
          </Box>
        )}
        {selectedValue === "allItems" && (
          <FilterByCategoryComponent
            handleCategoryViewChange={handleCategoryViewChange}
          />
        )}
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
                sellerId={item.seller.id}
                userId={userId}
                onDelete={onDelete}
                key={item.id}
                onAddItemToInterested={onAddItemToInterested}
              />
            );
          })}
      </Box>
    </>
  );
};
