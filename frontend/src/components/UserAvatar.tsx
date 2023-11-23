import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { tokenState, userState } from "@/atoms/user";

interface User {
  user: {
    email: string;
    name: string;
  };
}

const UserAvatar = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const [, setToken] = useRecoilState(tokenState);
  const [, setUser] = useRecoilState(userState);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback>{user.user.name[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.user.name}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>{user.user.email}</DropdownMenuLabel>

        <Button
          onClick={handleLogout}
          className="m-2 my-4"
          variant="destructive"
        >
          Log Out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
