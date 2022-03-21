import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        multiline
        {...register(name, {
          value: initialValue,
          required,
        })}
        error={!!errors[name]}
        helperText={!!errors[name] ? "*Post cannot be empty" : ""}
      />
      <Stack direction="row" justifyContent={isMobile ? "center" : "start"}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ mt: 2, marginRight: 1 }}
          type="submit"
        >
          Save
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          sx={{ mt: 2 }}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};
