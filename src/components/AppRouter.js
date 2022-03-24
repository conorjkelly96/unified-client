import { Route, Routes, Navigate } from "react-router-dom";

import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AboutUsPage } from "../pages/AboutUsPage";
import { Marketplace } from "../pages/Marketplace";
import { ForumBoardPage } from "../pages/ForumBoardPage";
import { ViewSavedJobs } from "../pages/ViewSavedJobs";
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
import { ViewForumPostPage } from "../pages/ViewForumPostPage";
// import { JobBoardPage } from "../pages/JobBoardPage";
import { EditItemPage } from "../pages/EditItemPage";
import { PurchaseRequestsPage } from "../pages/PurchaseRequestsPage";

export const AppRouter = () => {
  // TODO: wrap routes with isLoggedIn and user type
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/" element={<HomePage />} />

        {isLoggedIn && user?.__typename === "Student" && (
          <>
            <Route path="/jobs" element={<ViewJobsPage />} />
            <Route path="/job-board" element={<ViewSavedJobs />} />
            <Route path={"/forum/:id"} element={<ViewForumPostPage />} />
          </>
        )}

        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/forum-board" element={<ForumBoardPage />} />
            <Route
              path="/purchase-requests"
              element={<PurchaseRequestsPage />}
            />
            <Route path="/create-job" element={<CreateJobPage />} />
            <Route path="/create-item" element={<CreateItemPage />} />
            <Route path={`/listing/:id`} element={<SingleItemPage />} />
            <Route path={`/edit-item/:id`} element={<EditItemPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/my-jobs" element={<ViewCreatedJobs />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>

      <Footer />
    </>
  );
};
