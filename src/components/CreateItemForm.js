import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";
import { Grid, Select } from "@mui/material";
import { ItemCard } from "./ItemCard";

// import { Spinner } from "./Spinner";
import { CREATE_ITEM } from "../mutations";
import { SuccessfulItemModal } from "./SuccessfulItemModal";
import { useState } from "react";
import { MultiImageUploader } from "./MultiImageUploader";
import { useAuth } from "../contexts/AppProvider";

export const CreateItemForm = () => {
  const [executeCreateItem, { loading, error }] = useMutation(CREATE_ITEM);
  const [showNoBackEndModal, setNoBackEndModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmitItemForm = () => {
    setNoBackEndModal(true);
  };

  const handleClose = () => setNoBackEndModal(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
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
        navigate("/create-item", { replace: true });
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

  return (
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
      <Divider sx={{ marginTop: "50px", marginBottom: "25px" }}></Divider>
      <Box component="form" sx={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          id="itemName"
          label="Item Name"
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
          label="Item Description"
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
          label="Category"
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
          label="Condition"
          name="condition"
          variant="outlined"
          fullWidth
          {...register("condition", { required: true })}
          error={!!errors.condition}
          disabled={loading}
        />
        <TextField
          margin="normal"
          id="price"
          label="Item Price"
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
          label="Quantity"
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

            <LoadingButton
              loading={loading}
              loadingIndicator="Loading..."
              variant="contained"
              fullWidth
              type="submit"
              sx={styles.loadingButton}
              startIcon={error && <ErrorIcon />}
              color={error ? "error" : "primary"}
              onClick={onSubmitItemForm}
            >
              Create Item
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
          />
        </Box>
      </Grid>
    </Grid>
  );
};
