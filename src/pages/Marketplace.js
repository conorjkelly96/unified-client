import { useLazyQuery, useMutation } from "@apollo/client";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { ItemCard } from "../components/ItemCard";
import { VIEW_ALL_ITEMS } from "../queries";
import { DELETE_ITEM } from "../mutations";

export const Marketplace = () => {
  const [executeViewAllItems, { loading: allItemsLoading }] =
    useLazyQuery(VIEW_ALL_ITEMS);

  const [executeDeleteItem, { loading, error }] = useMutation(DELETE_ITEM);

  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const getItemData = async () => {
      try {
        const { data: itemData, error: itemDataError } =
          await executeViewAllItems();

        if (itemDataError) {
          throw new Error("Something went wrong.");
        }

        console.log("itemData:", itemData);

        setItemData(itemData.viewAllItem);
      } catch (error) {
        console.log(error);
      }
    };
    getItemData();
  }, [itemData, executeViewAllItems]);

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

      setItemData(deleteData.deleteItem);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Divider sx={{ maxWidth: "90%", margin: "auto" }} />
      <Box sx={{ px: "32px", paddingTop: "40px" }}>
        {itemData.map((item) => (
          <ItemCard
            itemName={item.itemName}
            itemDescription={item.itemDescription}
            category={item.category}
            status={item.status}
            condition={item.condition}
            price={item.price}
            quantity={item.quantity}
            seller={item.seller}
            onDelete={onDelete}
          />
        ))}
      </Box>
    </>
  );
};
