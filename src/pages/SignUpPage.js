import { useState } from "react";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { StaffSignUpForm } from "../components/StaffSignUpForm";
import { StudentSignUpForm } from "../components/StudentSignUpForm";

export const SignUpPage = () => {
  const [userType, setUserType] = useState("student");

  const handleChange = (event, value) => {
    setUserType(value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToggleButtonGroup
        color="primary"
        value={userType}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="student">Student</ToggleButton>
        <ToggleButton value="staff">Staff</ToggleButton>
      </ToggleButtonGroup>
      {userType === "staff" && <StaffSignUpForm />}
      {userType === "student" && <StudentSignUpForm />}
    </Container>
  );
};
