import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/Auth";
import Navbar from "../../components/NavBar";

const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{
        redirectLocation: location.pathname,
      }}
    />
  );
};

export default PrivateRoutes;
