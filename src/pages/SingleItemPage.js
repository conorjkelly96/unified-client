import { Container } from "@mui/material";
import { ViewSingleItemForm } from "../components/ViewSingleItemForm";
import { mainContainer } from "../styles";

export const SingleItemPage = () => {
  return (
    <Container
      sx={{
        ...mainContainer,
        boxShadow: "none",
        backgroundColor: "none",
      }}
    >
      <ViewSingleItemForm />
    </Container>
  );
};
