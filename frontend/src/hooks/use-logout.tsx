import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenState, userState } from "@/atoms/user";
import workoutsState from "@/atoms/workouts";

const useLogout = () => {
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
    navigate("/login");
  };

  return { logout };
};

export default useLogout;
