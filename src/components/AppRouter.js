import { Route, Routes, Navigate } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AboutUsPage } from "../pages/AboutUsPage";
import { BuySellPage } from "../pages/BuySellPage";
import { ForumBoardPage } from "../pages/ForumBoardPage";
import { JobBoardPage } from "../pages/JobBoardPage";
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/error" element={<Error />} />
        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/buy-sell" element={<BuySellPage />} />
            <Route path="/forum-board" element={<ForumBoardPage />} />
            <Route path="/job-board" element={<JobBoardPage />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>

      <Footer />
    </>
  );
};
