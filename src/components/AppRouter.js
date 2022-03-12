import { Route, Routes, Navigate } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { DashboardPage } from "../pages/DashboardPage";
import { useAuth } from "../contexts/AppProvider";
import { Error } from "../pages/Error";
import { CreateItemPage } from "../pages/CreateItemPage";

export const AppRouter = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/error" element={<Error />} />
      <Route path="/new-item" element={<CreateItemPage />} />
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
