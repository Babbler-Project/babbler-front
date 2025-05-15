// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query/query-client";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./features/auth/hooks/AuthContext";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoutes";
import { RedirectIfAuthenticated } from "./features/auth/components/RedirectIfAuthenticated";
import LoginPage from "./features/auth/components/LoginPage";
import RegisterPage from "./features/auth/components/RegisterPage";
import OrganizerRouter from "./features/organizer/components/OrganizerRouter";
import SpeakerRouter from "./features/speaker/components/SpeakerRouter";
import UserRouter from "./features/user/components/UserRouter";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes that redirect if already authenticated */}
            <Route
              path="/login"
              element={
                <RedirectIfAuthenticated>
                  <LoginPage />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/register"
              element={
                <RedirectIfAuthenticated>
                  <RegisterPage />
                </RedirectIfAuthenticated>
              }
            />

            {/* Error pages */}
            <Route
              path="/unauthorized"
              element={<div>Unauthorized page</div>}
            />

            {/* Protected routes by role */}
            <Route
              path="/organizer/*"
              element={
                <ProtectedRoute requiredRole="organizer">
                  <OrganizerRouter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/speaker/*"
              element={
                <ProtectedRoute requiredRole="speaker">
                  <SpeakerRouter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/*"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserRouter />
                </ProtectedRoute>
              }
            />

            {/* Default routes with authentication check */}
            <Route
              path="/"
              element={
                <RedirectIfAuthenticated>
                  <Navigate to="/login" replace />
                </RedirectIfAuthenticated>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
