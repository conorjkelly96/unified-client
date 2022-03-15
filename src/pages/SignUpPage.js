import Container from "@mui/material/Container";

import { StaffSignUpForm } from "../components/StaffSignUpForm";
import { StudentSignUpForm } from "../components/StudentSignUpForm";

export const SignUpPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <StaffSignUpForm />
      <StudentSignUpForm />
    </Container>
  );
};
