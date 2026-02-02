import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, authReady, user } = useAuth();

  console.log("ProtectedRoute render:", { isAuthenticated, authReady, user });

  if (!authReady) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
