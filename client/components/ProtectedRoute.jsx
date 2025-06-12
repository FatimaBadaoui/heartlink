import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
