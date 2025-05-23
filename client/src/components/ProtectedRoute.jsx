// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { tokenExpiry } from "../utils/tokenExpiry";

const ProtectedRoute = ({ children }) => {
  const isExpired = tokenExpiry();
  if (isExpired) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
