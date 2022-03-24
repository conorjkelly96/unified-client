import * as React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { COMMENT_ON_ITEM } from "../mutations";
import { useMutation } from "@apollo/client";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AppProvider";

export const ContactSellerModal = ({ handleClose, open, itemId }) => {
  const [executeComment, { loading: commentLoading, error: commentError }] =
    useMutation(COMMENT_ON_ITEM);
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ commentBody }) => {
    try {
      console.log(itemId);
      const { data } = await executeComment({
        variables: {
          input: {
            commentBody: commentBody.trim(),
            itemId,
          },
        },
      });

      if (data) {
        console.log("success");
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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let the seller know your questions below:
        </DialogContentText>
        <Box
          component="form"
          sx={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Questions"
            type="text"
            fullWidth
            variant="standard"
            {...register("commentBody", { required: true })}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
