import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenState, userState } from "@/atoms/user";
import useGetUser from "@/hooks/use-get-user";
import { useEffect } from "react";
import UserAvatar from "./UserAvatar";

const NavBar = () => {
  const [token] = useRecoilState(tokenState);
  const [user] = useRecoilState(userState);

  const { getUser } = useGetUser();

  useEffect(() => {
    let flag = true;
    if (flag && token) {
      getUser();
    }
    return () => {
      flag = false;
    };
  }, [token]);

  return (
    <nav className="flex items-center justify-between w-full p-6 bg-primary">
      <h1 className="text-2xl text-primary-foreground">Workout Tracker</h1>

      {!token && (
        <ul className="flex gap-8 text-[18px] font-medium text-primary-foreground items-center">
          <Link to="/login">
            <li className="underline cursor-pointer hover:no-underline">
              Login
            </li>
          </Link>

          <Link to="/signup">
            <li>
              <button className="px-4 py-2 transition-all ease-in-out rounded-sm bg-secondary text-secondary-foreground hover:bg-gray-200">
                Signup
              </button>
            </li>
          </Link>
        </ul>
      )}

      {user && <UserAvatar user={user} />}
    </nav>
  );
};

export default NavBar;
