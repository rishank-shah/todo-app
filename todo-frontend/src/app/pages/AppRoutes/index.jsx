import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Todo } from "../Todo/Loadable";
import { Login } from "../Login/Loadable";
import PrivateRoutes from "./PrivateRoutes";
import { Register } from "../Register/Loadable";
import { Category } from "../Category/loadable";
import { NotFoundPage } from "../NotFoundPage/Loadable";
import { PublicRouteWrapper } from "./PublicRouteWrapper";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to={"/todo"} replace />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/category" element={<Category />} />
        </Route>

        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRouteWrapper>
              <Login />
            </PublicRouteWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRouteWrapper>
              <Register />
            </PublicRouteWrapper>
          }
        />

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={"/404"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
