import { useSearchParams, Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import useGetUser from "@/hooks/use-get-user";
import { tokenState } from "@/atoms/user";

import { toast } from "@/components/ui/use-toast";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const [, setToken] = useRecoilState(tokenState);
  const { getUser } = useGetUser();

  if (searchParams.has("accessToken")) {
    const data = {
      token: searchParams.get("accessToken") as string,
      _id: searchParams.get("_id") as string,
    };

    localStorage.setItem("userToken", JSON.stringify(data));
    setToken(data);
    getUser();
    toast({
      title: "Success",
      description: "Logged in succesfully.",
    });
    return <Navigate to="/" replace />;
  } else if (searchParams.has("isNewUser")) {
    toast({
      title: "Success",
      description: "Account has been created succesfully.",
    });
    return <Navigate to="/login" replace />;
  } else if (searchParams.has("emailAlreadyExists")) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description:
        "User with this email already exists. Can't login with to google with this email",
    });
  }

  return (
    <div className="m-4 text-destructive">
      Error occured authenticating with google. Please try again
    </div>
  );
};

export default Callback;
