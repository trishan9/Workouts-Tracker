import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { tokenState, userState } from "@/atoms/user";

const useGetUser = () => {
  const [token] = useRecoilState(tokenState);
  const [, setUser] = useRecoilState(userState);

  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
    },
    onSuccess: (data) => {
      setUser(data.data);
    },
  });

  const getUser = () => {
    mutation.mutate();
  };

  return {
    getUser,
    isPending: mutation.isPending,
  };
};

export default useGetUser;
