import { Navigate } from "react-router-dom";
import CookieHelper from "../../helpers/cookie";

export function PublicRouteWrapper({ children }) {
  const isLoggedIn = !!CookieHelper.getData("access_token");

  if (isLoggedIn) {
    return <Navigate to={"/todo"} replace />;
  }

  return children;
}
