import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const EditableTextField = ({
  onSubmit,
  onCancel,
  initialValue,
  label,
  name,
  required,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        {...register(name, {
          value: initialValue,
          required,
        })}
        error={!!errors[name]}
      />
      <Button
        variant="contained"
        size="small"
        color="info"
        sx={{ mt: 2 }}
        type="submit"
      >
        Save
      </Button>
      <Button
        variant="contained"
        size="small"
        color="info"
        sx={{ mt: 2 }}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </Box>
  );
};
