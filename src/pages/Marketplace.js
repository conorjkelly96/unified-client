import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
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

  const [executeDeleteItem, { loading, error }] = useMutation(DELETE_ITEM);

  const onDelete = async (event) => {
    const itemId = event.target.id;
    console.log(itemId);
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

  return (
    <>
      <Divider sx={{ maxWidth: "90%", margin: "auto" }} />
      <Box sx={{ px: "32px", paddingTop: "40px" }}>
        {itemData?.viewAllItems?.map((item) => {
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
