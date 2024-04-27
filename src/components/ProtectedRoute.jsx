import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Login from "./Login.jsx";
// import MyAppBar from "./MyAppBar";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Login />;
  } else {
    return (
      <>
        {/* <MyAppBar /> */}
        <Outlet />
      </>
    );
  }
};

export default ProtectedRoute;
