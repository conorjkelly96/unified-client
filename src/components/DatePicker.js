import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";

export const DatePicker = ({
  date,
  setDate,
  setValue,
  loading,
  register,
  errors,
  name,
  label,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={label}
        inputFormat="MM/dd/yyyy"
        value={date}
        onChange={(value) => {
          setDate(value);
          setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            margin="normal"
            id={name}
            name={name}
            variant="outlined"
            fullWidth
            disabled={loading}
            {...register(name, { required: true })}
            error={!!errors[name]}
          />
        )}
      />
    </LocalizationProvider>
  );
};
