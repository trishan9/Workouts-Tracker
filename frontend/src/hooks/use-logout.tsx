import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import { tokenState, userState } from "@/atoms/user";
import workoutsState from "@/atoms/workouts";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [, setToken] = useRecoilState(tokenState);
  const [, setUser] = useRecoilState(userState);
  const [, setWorkouts] = useRecoilState(workoutsState);

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    //@ts-expect-error ignore
    setWorkouts(null);
    queryClient.clear();
    navigate("/login");
  };

  return { logout };
};

export default useLogout;
