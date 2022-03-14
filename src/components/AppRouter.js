import { Route, Routes, Navigate } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { DashboardPage } from "../pages/DashboardPage";
import { useAuth } from "../contexts/AppProvider";
import { Error } from "../pages/Error";
import { CreateItemPage } from "../pages/CreateItemPage";
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        {isLoggedIn ? (
          <>
            {user?.__typename === "Staff" && (
              <Route path={`/${user.id}/jobs`} element={<ViewCreatedJobs />} />
            )}
            <Route path="/create-job" element={<CreateJobPage />} />
            <Route path="/create-item" element={<CreateItemPage />} />
            <Route path="/about" element={<AboutPage />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>

      <Footer />
    </>
  );
};
