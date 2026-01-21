import { Navigate } from "react-router-dom";
import AuthProvider from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = AuthProvider.useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
