import { Route, Routes, Navigate } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { DashboardPage } from "../pages/DashboardPage";
import { useAuth } from "../contexts/AppProvider";
import { Error } from "../pages/Error";
import { Navbar } from "./Navbar";
import { CreateJobPage } from "../pages/CreateJobPage";
import { ViewJobsPage } from "../pages/ViewJobsPage";
import { Footer } from "../components/Footer";
import { AboutPage } from "../pages/AboutPage";
import { ViewCreatedJobs } from "../pages/ViewCreatedJobs";

export const AppRouter = () => {
  // TODO: wrap routes with isLoggedIn and user type
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-job" element={<CreateJobPage />} />

        {user?.__typename === "Staff" && (
          <Route path={`/${user.id}/jobs`} element={<ViewCreatedJobs />} />
        )}
        {user?.__typename === "Student" && (
          <Route path="/jobs" element={<ViewJobsPage />} />
        )}

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};
