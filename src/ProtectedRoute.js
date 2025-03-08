import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Check login status

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
