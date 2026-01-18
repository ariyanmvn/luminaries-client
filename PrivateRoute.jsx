import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // redirect to login if not logged in
  }

  return children; // render the protected page
}
