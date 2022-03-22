import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const FilterByCategoryComponent = () => {
  return (
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
        sx={{ margin: "16px 0px" }}
      >
        <MenuItem value={"Clothing & Accessories"}>
          Clothing & Accessories
        </MenuItem>
        <MenuItem value={"Sporting Goods"}>Sporting Goods</MenuItem>
        <MenuItem value={"Electronics"}>Electronics</MenuItem>
        <MenuItem value={"Academic Materials"}>Academic Materials</MenuItem>
        <MenuItem value={"Other"}>Other</MenuItem>
      </Select>
    </FormControl>
  );
};
