import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AboutUsPage } from "../pages/AboutUsPage";
import { Marketplace } from "../pages/Marketplace";
import { ForumBoardPage } from "../pages/ForumBoardPage";
import { ViewSavedJobs } from "../pages/ViewSavedJobs";
import { CreateItemPage } from "../pages/CreateItemPage";
import { SingleItemPage } from "../pages/SingleItemPage";
import { CreateJobPage } from "../pages/CreateJobPage";
import { ViewJobsPage } from "../pages/ViewJobsPage";
import { ViewCreatedJobs } from "../pages/ViewCreatedJobs";
import { CreatePostPage } from "../pages/CreatePostPage";
import { ViewForumPostPage } from "../pages/ViewForumPostPage";
import { EditItemPage } from "../pages/EditItemPage";
import { PurchaseRequestsPage } from "../pages/PurchaseRequestsPage";
import { useAuth } from "../contexts/AppProvider";

export const AppRouter = () => {
  const { isLoggedIn, user } = useAuth();

  console.log(user);

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ minHeight: "75vh" }}>
        <Routes>
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          {isLoggedIn && (
            <>
              <Route path="/dashboard" element={<DashboardPage />} />
            </>
          )}

          {isLoggedIn && user?.type === "student" && (
            <>
              <Route path="/listing/:id" element={<SingleItemPage />} />
              <Route path="/create-item" element={<CreateItemPage />} />
              <Route path="/edit-item/:id" element={<EditItemPage />} />
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="/forum" element={<ForumBoardPage />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route
                path="/purchase-requests"
                element={<PurchaseRequestsPage />}
              />
              <Route path={"/forum/:id"} element={<ViewForumPostPage />} />
              <Route path="/jobs" element={<ViewJobsPage />} />
              <Route path="/job-board" element={<ViewSavedJobs />} />
            </>
          )}

          {isLoggedIn && user?.type === "staff" && (
            <>
              <Route path="/my-jobs" element={<ViewCreatedJobs />} />
              <Route path="/create-job" element={<CreateJobPage />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Box>
      <Footer />
    </Stack>
  );
};
