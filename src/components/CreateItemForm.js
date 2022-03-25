import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";

// import { Spinner } from "./Spinner";
import { CREATE_ITEM } from "../mutations";
import { useState } from "react";
import { MultiImageUploader } from "./MultiImageUploader";
import { useAuth } from "../contexts/AppProvider";
import { ItemCard } from "./ItemCard";
import { postButton } from "../styles";

export const CreateItemForm = () => {
  const [executeCreateItem, { loading, error }] = useMutation(CREATE_ITEM);
  const [uploadedImages, setUploadedImages] = useState([]);

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

  return (
    <Grid container spacing={2} sx={{ margin: "auto" }}>
      <Grid item xs={12} lg={6}>
        <Box>
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
              autoFocus
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
              autoFocus
              {...register("itemDescription", { required: false })}
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
                {...register("category", { required: true })}
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
                {...register("condition", { required: true })}
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
              type="submit"
              sx={loading ? styles.loadingButton : { ...postButton, mt: 2 }}
              startIcon={error && <ErrorIcon />}
              color={error ? "error" : "primary"}
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
            images={uploadedImages}
            seller={user.username}
            isPreview={true}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
