import { Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";

import Auth from "../contexts/AuthContext";

function PrivateRoute() {
  const auth = useContext(Auth);
  return auth.token && auth.mode === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
