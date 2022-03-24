import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { ItemCard } from "./ItemCard";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// import { Spinner } from "./Spinner";
import { UPDATE_ITEM } from "../mutations";
import { useEffect, useState } from "react";
import { MultiImageUploader } from "./MultiImageUploader";
import { useAuth } from "../contexts/AppProvider";
import { GET_SINGLE_ITEM_DATA } from "../queries";
import { Spinner } from "./Spinner";
import { LoadingButton } from "@mui/lab";

export const EditItemForm = () => {
  const [executeUpdateItem, { loading, error }] = useMutation(UPDATE_ITEM);
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
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const itemName = watch("itemName");
  const itemDescription = watch("itemDescription");
  const category = watch("category");
  const condition = watch("condition");
  const price = watch("price");
  const quantity = watch("quantity");

  useEffect(() => {
    if (itemData) {
      setValue("itemName", itemData.getSingleItemData.itemName);
      setValue("itemDescription", itemData.getSingleItemData.itemDescription);
      setValue("category", itemData.getSingleItemData.category);
      setValue("condition", itemData.getSingleItemData.condition);
      setValue("price", itemData.getSingleItemData.price);
      setValue("images", uploadedImages);
    }
  }, [itemData]);

  const onSubmit = async () => {
    try {
      console.log(itemName);
      const { data } = await executeUpdateItem({
        variables: {
          itemId: id,
          input: {
            itemName: itemName.trim(),
            itemDescription: itemDescription.trim(),
            category: category.trim(),
            condition: condition.trim(),
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            images: [...uploadedImages, ...itemData.getSingleItemData.images],
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
      paddingTop: 3,
      paddingBottom: 2,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 4,
      paddingTop: 3,
    },
    loadingButton: { marginTop: 3, marginBottom: 2 },
    errorContainer: {
      marginTop: 2,
      color: "#d32f2f",
      textAlign: "center",
    },
  };

  if (itemLoading) {
    return <Spinner loading={itemLoading} />;
  }

  if (itemError) {
    console.log(itemError);
    return <h1>Error</h1>;
  }

  console.log(uploadedImages);

  return (
    !itemLoading &&
    !itemError &&
    itemData?.getSingleItemData && (
      <Grid container spacing={2} sx={{ maxWidth: 1200, margin: "auto" }}>
        <Grid item xs={12} lg={6}>
          <Box sx={styles.container}>
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
                label="Item Name"
                name="itemName"
                variant="outlined"
                fullWidth
                {...register("itemName", {
                  required: true,
                  value: itemData.getSingleItemData.itemName,
                })}
                error={!!errors.itemName}
                disabled={loading}
              />
              <TextField
                margin="normal"
                id="itemDescription"
                label="Item Description"
                name="itemDescription"
                variant="outlined"
                fullWidth
                {...register("itemDescription", {
                  required: false,
                  value: itemData.getSingleItemData.itemDescription,
                })}
                error={!!errors.itemDescription}
                disabled={loading}
              />

              <FormControl fullWidth>
                <InputLabel id="category" sx={{ margin: "16px 0px" }}>
                  Category
                </InputLabel>
                <Select
                  id="category"
                  label="Category"
                  name="category"
                  variant="outlined"
                  fullWidth
                  {...register("category", {
                    required: true,
                    value: "Other",
                  })}
                  error={!!errors.category}
                  disabled={loading}
                  sx={{ margin: "16px 0px" }}
                >
                  <MenuItem value={"Clothing & Accessories"}>
                    Clothing & Accessories
                  </MenuItem>
                  <MenuItem value={"Sporting Goods"}>Sporting Goods</MenuItem>
                  <MenuItem value={"Electronics"}>Electronics</MenuItem>
                  <MenuItem value={"Academic Materials"}>
                    Academic Materials
                  </MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="condition" sx={{ margin: "16px 0px" }}>
                  Condition
                </InputLabel>
                <Select
                  id="condition"
                  label="Condition"
                  name="condition"
                  variant="outlined"
                  fullWidth
                  {...register("condition", {
                    required: true,
                    value: itemData.getSingleItemData.condition,
                  })}
                  error={!!errors.condition}
                  disabled={loading}
                  sx={{ margin: "16px 0px" }}
                >
                  <MenuItem value={"New"}>New</MenuItem>
                  <MenuItem value={"Fair"}>Fair</MenuItem>
                  <MenuItem value={"Like New"}>Like New</MenuItem>
                  <MenuItem value={"Used"}>Used</MenuItem>
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                id="price"
                label="Price"
                name="price"
                variant="outlined"
                fullWidth
                {...register("price", {
                  required: true,
                  value: itemData.getSingleItemData.price,
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
                  value: itemData.getSingleItemData.quantity,
                })}
                error={!!errors.quantity}
                disabled={loading}
              />
              <MultiImageUploader
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
                username={user.username}
              />
              <LoadingButton
                loading={loading}
                loadingIndicator="Loading..."
                variant="contained"
                fullWidth
                type="submit"
                sx={styles.loadingButton}
                color={error ? "error" : "primary"}
                onClick={onSubmit}
              >
                Save Item
              </LoadingButton>
            </Box>
          </Box>
        </Grid>

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
              images={
                uploadedImages.length
                  ? [...uploadedImages, ...itemData.getSingleItemData.images]
                  : itemData.getSingleItemData.images
              }
              isPreview={true}
              seller={user.username}
            />
          </Box>
        </Grid>
      </Grid>
    )
  );
};
