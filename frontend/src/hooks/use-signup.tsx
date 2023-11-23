import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

interface SignupProps {
  name: string;
  email: string;
  password: string;
}

const useSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (payload: SignupProps) => {
      return await axios.post("/api/auth/signup", payload);
    },
    onSuccess: () => {
      navigate("/login");
      toast({
        title: "Success",
        description: "Account has been created succesfully.",
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

  const createUser = (payload: SignupProps) => {
    mutation.mutate(payload);
  };

  return {
    createUser,
    isPending: mutation.isPending,
  };
};

export default useSignup;
