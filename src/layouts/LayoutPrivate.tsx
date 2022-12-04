import React from "react";
import { Navigate } from "react-router-dom";

type LayoutPrivateProps = {
    children: React.ReactElement;
};

const LayoutPrivate = ({ children }: LayoutPrivateProps) => {
    const auth = JSON.parse(localStorage.getItem("user") as string);
    if (auth.user.role === "user") return <Navigate to="/" />;
    return children;
};

export default LayoutPrivate;