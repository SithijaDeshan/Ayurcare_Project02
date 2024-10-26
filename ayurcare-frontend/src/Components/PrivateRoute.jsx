import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
    const userRole = localStorage.getItem("role"); // Retrieve user role from localStorage

    if (!userRole) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return children; // Render the component if authorized
};

export default PrivateRoute;

