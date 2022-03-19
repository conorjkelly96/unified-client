import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Button, Grid, Select } from "@mui/material";
import { ItemCard } from "./ItemCard";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import BoltIcon from "@mui/icons-material/Bolt";

export const ViewSingleItemForm = () => {
  const onContactSeller = () => {
    console.log("contact seller");
  };

  const styles = {
    container: {
      backgroundColor: "#fff",
    },
    header: {
      paddingTop: 2,
      paddingBottom: 2,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 4,
    },
    loadingButton: { marginTop: 3, marginBottom: 2 },
    errorContainer: {
      marginTop: 2,
      color: "#d32f2f",
      textAlign: "center",
    },
  };

  return (
    <Grid container spacing={2} sx={{ maxWidth: 1200, margin: "auto" }}>
      <Grid item xs={12} lg={6}>
        <Divider sx={{ maxWidth: "90%", margin: "auto" }} />
        <Box sx={{ px: "32px", paddingTop: "40px" }}>
          <ItemCard
            itemName={"itemName"}
            itemDescription={"itemDescription"}
            category={"category"}
            condition={"condition"}
            price={"price"}
            quantity={"quantity"}
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