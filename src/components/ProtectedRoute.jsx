import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Login from "./Login.jsx";

const ProtectedRoute = () => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
  if (!user) {
    return <Login />;
  } else if (!isAdmin) {
    <p>Not Authorized</p>;
  } else {
    return (
      <>
        <Outlet />
      </>
    );
  }
};

export default ProtectedRoute;
