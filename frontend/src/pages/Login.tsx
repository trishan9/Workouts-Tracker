import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { tokenState } from "@/atoms/user";

import LoginForm from "@/components/LoginForm";

const Login: FC = () => {
  const [token] = useRecoilState(tokenState);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="m-auto max-w-[30rem] my-48 sm:my-32 px-6">
      <p className="mb-4 text-xl sm:text-2xl">Log in to Workouts Tracker</p>

      <div className="p-6 border rounded-md bg-background">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
