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

export const ViewSingleItemForm = () => {
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
        </Box>
      </Grid>
    </Grid>
  );
};
