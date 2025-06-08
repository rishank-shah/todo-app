import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/Auth";

export function PublicRouteWrapper({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={"/todo"} replace />;
  }

  return children;
}
