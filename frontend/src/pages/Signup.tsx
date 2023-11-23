import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenState } from "@/atoms/user";
import SignupForm from "@/components/SignupForm";

const Login: FC = () => {
  const [token] = useRecoilState(tokenState);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="m-auto w-[30rem] my-32">
      <p className="mb-4 text-2xl">Create Workouts Tracker Account</p>

      <div className="p-6 border rounded-md bg-secondary">
        <SignupForm />
      </div>
    </div>
  );
};

export default Login;
