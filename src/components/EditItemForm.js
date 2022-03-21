import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Grid, Select } from "@mui/material";
import { ItemCard } from "./ItemCard";

// import { Spinner } from "./Spinner";
import { UPDATE_ITEM } from "../mutations";

import { useState } from "react";
import { MultiImageUploader } from "./MultiImageUploader";
import { useAuth } from "../contexts/AppProvider";
import { GET_SINGLE_ITEM_DATA } from "../queries";
import { Spinner } from "./Spinner";

export const EditItemForm = () => {
  const [executeCreateItem, { loading, error }] = useMutation(UPDATE_ITEM);
  const [uploadedImages, setUploadedImages] = useState([]);

  const { id } = useParams();

  const {
    loading: itemLoading,
    error: itemError,
    data: itemData,
  } = useQuery(GET_SINGLE_ITEM_DATA, {
    variables: {
      id: id,
    },
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const itemName = watch("itemName", "");
  const itemDescription = watch("itemDescription", "");
  const category = watch("category", "");
  const condition = watch("condition", "");
  const price = watch("price", "");
  const quantity = watch("quantity", "");

  const onSubmit = async ({
    itemName,
    itemDescription,
    category,
    condition,
    price,
    quantity,
  }) => {
    try {
      const { data } = await executeCreateItem({
        variables: {
          input: {
            itemName: itemName.trim(),
            itemDescription: itemDescription.trim(),
            category: category.trim(),
            condition: condition.trim(),
            price: parseFloat(price),
            quantity: parseInt(quantity.trim(), 10),
            images: uploadedImages,
          },
        },
      });

      if (data) {
        console.log("success");
        // setNoBackEndModal(true);
        navigate("/marketplace", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
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

  if (itemLoading) {
    <Spinner />;
  }

  if (itemError) {
    console.log(itemError);
  }

  return (
    !itemLoading &&
    !itemError && (
      <Grid container spacing={2} sx={{ maxWidth: 1200, margin: "auto" }}>
        <Grid item xs={12} lg={6}>
          <Box sx={styles.container}>
            {/* <SuccessfulItemModal show={showNoBackEndModal} onClose={handleClose} />; */}
            <Typography
              variant="h4"
              gutterBottom
              component="h1"
              align="center"
              sx={styles.header}
            >
              Sell your item today!
            </Typography>
            <Divider />
            <Box
              component="form"
              sx={styles.form}
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                margin="normal"
                id="itemName"
                label={itemData.getSingleItemData.itemName}
                name="itemName"
                variant="outlined"
                fullWidth
                {...register("itemName", { required: true })}
                error={!!errors.itemName}
                disabled={loading}
              />
              <TextField
                margin="normal"
                id="itemDescription"
                label={itemData.getSingleItemData.itemDescription}
                name="itemDescription"
                variant="outlined"
                fullWidth
                {...register("itemDescription", { required: false })}
                error={!!errors.itemDescription}
                disabled={loading}
              />
              <TextField
                margin="normal"
                id="category"
                label={itemData.getSingleItemData.category}
                name="category"
                variant="outlined"
                fullWidth
                {...register("category", { required: true })}
                error={!!errors.category}
                disabled={loading}
              />
              <TextField
                margin="normal"
                id="condition"
                label={itemData.getSingleItemData.condition}
                variant="outlined"
                fullWidth
                {...register("condition", { required: true })}
                error={!!errors.condition}
                disabled={loading}
              />
              <TextField
                margin="normal"
                id="price"
                label={itemData.getSingleItemData.price}
                name="price"
                variant="outlined"
                fullWidth
                {...register("price", {
                  required: true,
                  validate: (value) => {
                    const regex = new RegExp(/^\d*\.?\d*$/);
                    return regex.test(value);
                  },
                })}
                error={!!errors.price}
                disabled={loading}
              />
              <TextField
                type="number"
                margin="normal"
                id="quantity"
                name="quantity"
                variant="outlined"
                fullWidth
                {...register("quantity", {
                  required: true,
                })}
                defaultValue={1}
                error={!!errors.quantity}
                disabled={loading}
              />
              <MultiImageUploader
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
                username={user.username}
              />
            </Box>
          </Box>

          <Grid item xs={12} lg={6}>
            <Typography
              variant="h4"
              gutterBottom
              component="h1"
              align="center"
              sx={styles.header}
            >
              Preview
            </Typography>
            <Divider sx={{ maxWidth: "90%", margin: "auto" }} />
            <Box sx={{ px: "32px", paddingTop: "40px" }}>
              <ItemCard
                itemName={itemName}
                itemDescription={itemDescription}
                category={category}
                condition={condition}
                price={price}
                quantity={quantity}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    )
  );
};
