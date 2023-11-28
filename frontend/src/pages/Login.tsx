import { FC } from "react";
import { Link, Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { tokenState } from "@/atoms/user";
import google from "@/assets/google.png";

import LoginForm from "@/components/LoginForm";
import { Separator } from "@/components/ui/separator";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login: FC = () => {
  const [token] = useRecoilState(tokenState);
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="m-auto max-w-[30rem] my-28 sm:my-32 px-6">
      <p className="mb-4 text-xl sm:text-2xl">Log in to Workouts Tracker</p>

      <Link to={`${VITE_API_BASE_URL}/api/auth/google`}>
        <button className="flex items-center justify-center w-full gap-2.5 py-2 mb-2 border rounded-md bg-background hover:bg-background/40">
          <img className="w-6" src={google} alt="Google Logo" />
          Sign in with Google
        </button>
      </Link>

      <div className="flex items-center justify-center w-full gap-8 mb-2">
        <Separator className="w-[40%]" />
        <p className="text-sm text-center ">or</p>
        <Separator className="w-[40%]" />
      </div>

      <div className="p-6 border rounded-md bg-background">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
