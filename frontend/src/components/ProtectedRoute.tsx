import { Fragment, ReactElement } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
