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

  const styles = {
    container: { textAlign: "center" },
  };

  return (
    <Container component="main" maxWidth="xs" sx={styles.container}>
      <ToggleButtonGroup
        color="primary"
        value={userType}
        exclusive
        onChange={handleChange}
        sx={{ margin: "25px" }}
      >
        <ToggleButton value="student">Student</ToggleButton>
        <ToggleButton value="staff">Staff</ToggleButton>
      </ToggleButtonGroup>
      {userType === "staff" && <StaffSignUpForm />}
      {userType === "student" && <StudentSignUpForm />}
    </Container>
  );
};
