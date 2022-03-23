import { useState } from "react";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { StaffLoginForm } from "../components/StaffLoginForm";
import { StudentLoginForm } from "../components/StudentLoginForm";
import { mainContainer, pageHeader } from "../styles";

export const LoginPage = () => {
  const [userType, setUserType] = useState("student");

  const handleChange = (event, value) => {
    setUserType(value);
  };

  return (
    <Container component="main" maxWidth="xs" sx={mainContainer}>
      <ToggleButtonGroup
        color="primary"
        value={userType}
        exclusive
        onChange={handleChange}
        sx={pageHeader}
      >
        <ToggleButton value="student">Student</ToggleButton>
        <ToggleButton value="staff">Staff</ToggleButton>
      </ToggleButtonGroup>
      {userType === "staff" && <StaffLoginForm />}
      {userType === "student" && <StudentLoginForm />}
    </Container>
  );
};
