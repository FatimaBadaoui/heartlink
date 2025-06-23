import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  console.log("ProtectedRoute: storedUser:", storedUser);
  if (!storedUser) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
