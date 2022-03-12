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

export const AppRouter = () => {
  const { isLoggedIn } = useAuth();

  return (
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
  );
};
