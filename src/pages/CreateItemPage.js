import Container from "@mui/material/Container";

import { CreateItemForm } from "../components/CreateItemForm";
import { mainContainer, pageHeader } from "../styles";

export const CreateItemPage = () => {
  return <CreateItemForm />;
};

// export const CreateItemPage = () => {
//   return (
//     <Container component="main" maxWidth="lg" sx={mainContainer}>
//       <CreateItemForm />
//     </Container>
//   );
// };
