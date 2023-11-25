import { Fragment, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { tokenState } from "@/atoms/user";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const [token] = useRecoilState(tokenState);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
