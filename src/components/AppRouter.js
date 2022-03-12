import { Route, Routes, Navigate } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { DashboardPage } from "../pages/DashboardPage";
import { useAuth } from "../contexts/AppProvider";
import { Error } from "../pages/Error";
import { CreateJobPage } from "../pages/CreateJobPage";

export const AppRouter = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/error" element={<Error />} />
      <Route path="/create-job" element={<CreateJobPage />} />
      {isLoggedIn ? (
        <>
          <Route path="/dashboard" element={<DashboardPage />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};
