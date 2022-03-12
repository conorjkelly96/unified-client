import Container from "@mui/material/Container";

import { CreateItemForm } from "../components/CreateItemForm";

export const CreateItemPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CreateItemForm />
    </Container>
  );
};
