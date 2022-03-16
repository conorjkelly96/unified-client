import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { ItemCard } from "../components/ItemCard";

export const Marketplace = () => {
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
