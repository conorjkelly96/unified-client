import { Route, Routes, Navigate } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { DashboardPage } from "../pages/DashboardPage";
import { useAuth } from "../contexts/AppProvider";
import { Error } from "../pages/Error";
import { Navbar } from "./Navbar";
import { CreateJobPage } from "../pages/CreateJobPage";
import { ViewJobsPage } from "../pages/ViewJobsPage";

export const AppRouter = () => {
  // TODO: wrap routes with isLoggedIn and user type
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/error" element={<Error />} />
        <Route path="/create-job" element={<CreateJobPage />} />
        <Route path="/jobs" element={<ViewJobsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </>
  );
};
