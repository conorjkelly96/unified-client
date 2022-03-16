import { useLazyQuery } from "@apollo/client";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { ItemCard } from "../components/ItemCard";
import { VIEW_ALL_ITEMS } from "../queries";

export const Marketplace = () => {
  const [executeViewAllItems, { loading: allItemsLoading }] =
    useLazyQuery(VIEW_ALL_ITEMS);

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

  return (
    <>
      <Divider sx={{ maxWidth: "90%", margin: "auto" }} />
      <Box sx={{ px: "32px", paddingTop: "40px" }}>
        <ItemCard
          itemName={"itemName,"}
          itemDescription={"  itemDescription,"}
          category={"  category,"}
          status={"  status,"}
          condition={"  condition,"}
          price={"  price,"}
          quantity={"  quantity,"}
          seller={"  seller.username,"}
        />
      </Box>
    </>
  );
};
