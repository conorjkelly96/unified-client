import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/material/Divider";
import { Select } from "@mui/material";

// import { Spinner } from "./Spinner";
import { CREATE_ITEM } from "../mutations";

export const CreateItemForm = () => {
  const [executeCreateItem, { loading, error }] = useMutation(CREATE_ITEM);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({
    itemName,
    itemDescription,
    category,
    condition,
    price,
    quantity,
    images,
  }) => {
    try {
      const { data } = await executeCreateItem({
        variables: {
          input: {
            itemName: itemName.trim(),
            itemDescription: itemDescription.trim(),
            category: category.trim(),
            condition: condition.trim(),
            price: price.trim(),
            quantity: quantity.trim(),
            images: images.trim(),
          },
        },
      });

      if (data) {
        console.log("success");
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
      {/* {(universitiesLoading || universityLoading) && <Spinner />} */}
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
          //   disabled={loading}
        />
        <TextField
          margin="normal"
          id="itemDescription"
          label="Item Description"
          name="itemDescription"
          variant="outlined"
          fullWidth
          {...register("itemDescription", { required: true })}
          error={!!errors.itemDescription}
          //   disabled={loading}
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
          //   disabled={loading}
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
          //   disabled={loading}
        />
        <TextField
          margin="normal"
          id="price"
          label="Item Price"
          name="price"
          variant="outlined"
          fullWidth
          {...register("price", { required: true })}
          error={!!errors.price}
          //   disabled={loading}
        />
        <TextField
          margin="normal"
          id="quantity"
          label="Quantity"
          name="quantity"
          variant="outlined"
          fullWidth
          {...register("quantity", {
            required: true,
          })}
          error={!!errors.quantity}
          //   disabled={loading}
        />
        <TextField
          id="images"
          label="Images"
          name="images"
          variant="outlined"
          fullWidth
          {...register("images", { required: true })}
          error={!!errors.images}
          //   disabled={loading}
          sx={{ margin: "16px" }}
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
        >
          Create Item
        </LoadingButton>
      </Box>
    </Box>
  );
};
