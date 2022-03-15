import Container from "@mui/material/Container";

import { StaffLoginForm } from "../components/StaffLoginForm";
import { StudentLoginForm } from "../components/StudentLoginForm";

export const LoginPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <StaffLoginForm />
      <StudentLoginForm />
    </Container>
  );
};
