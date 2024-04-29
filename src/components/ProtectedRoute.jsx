import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Login from "./Login.jsx";
import { Button } from "@mui/material";

const ProtectedRoute = () => {
  const { user, isAdmin, loading, logout } = useAuth();
  if (loading) {
    return (
      <>
        <div>Loading...</div>
        <Button onClick={logout()}></Button>
      </>
    );
  }
  if (!user || !isAdmin) {
    return <Login />;
  } else {
    return (
      <>
        <Outlet />
      </>
    );
  }
};

export default ProtectedRoute;
