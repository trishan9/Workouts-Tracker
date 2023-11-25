import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { useToast } from "@/components/ui/use-toast";
import { tokenState } from "@/atoms/user";
import useGetUser from "./use-get-user";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginProps {
  email: string;
  password: string;
}

const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [, setToken] = useRecoilState(tokenState);
  const { getUser } = useGetUser();

  const mutation = useMutation({
    mutationFn: async (payload: LoginProps) => {
      return await axios.post(`${VITE_API_BASE_URL}/api/auth/login`, payload);
    },
    onSuccess: (data) => {
      localStorage.setItem("userToken", JSON.stringify(data.data));
      setToken(data.data);
      getUser();
      navigate("/");
      toast({
        title: "Success",
        description: "Logged in succesfully.",
      });
    },
    //@ts-expect-error ignore
    onError: ({ response }: unknown) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response?.data?.error,
      });
    },
  });

  const loginUser = (payload: LoginProps) => {
    mutation.mutate(payload);
  };

  return {
    loginUser,
    isPending: mutation.isPending,
  };
};

export default useLogin;
