import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { tokenState } from "@/atoms/user";

import SignupForm from "@/components/SignupForm";

const Signup: FC = () => {
  const [token] = useRecoilState(tokenState);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="m-auto max-w-[30rem] my-14 px-6">
      <p className="mb-4 text-xl sm:text-2xl">
        Create Workouts Tracker Account
      </p>

      <div className="p-6 border rounded-md bg-background">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
