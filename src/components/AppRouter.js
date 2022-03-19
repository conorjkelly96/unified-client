import { Route, Routes, Navigate } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AboutUsPage } from "../pages/AboutUsPage";
import { Marketplace } from "../pages/Marketplace";
import { ForumBoardPage } from "../pages/ForumBoardPage";
import { JobBoardPage } from "../pages/JobBoardPage";
import { useAuth } from "../contexts/AppProvider";
import { Error } from "../pages/Error";
import { CreateItemPage } from "../pages/CreateItemPage";
import { SingleItemPage } from "../pages/SingleItemPage";
import { Navbar } from "./Navbar";
import { CreateJobPage } from "../pages/CreateJobPage";
import { ViewJobsPage } from "../pages/ViewJobsPage";
import { Footer } from "../components/Footer";
import { ViewCreatedJobs } from "../pages/ViewCreatedJobs";
import { CreatePostPage } from "../pages/CreatePostPage";

export const AppRouter = () => {
  // TODO: wrap routes with isLoggedIn and user type
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {isLoggedIn && user?.__typename === "Student" && (
          <Route path="/jobs" element={<ViewJobsPage />} />
        )}

        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/forum-board" element={<ForumBoardPage />} />
            <Route path="/job-board" element={<JobBoardPage />} />
            <Route path="/create-job" element={<CreateJobPage />} />
            <Route path="/create-item" element={<CreateItemPage />} />
            <Route path={`/listing/:id`} element={<SingleItemPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/my-jobs" element={<ViewCreatedJobs />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>

      <Footer />
    </>
  );
};
