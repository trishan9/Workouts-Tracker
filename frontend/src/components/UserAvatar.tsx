import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import useLogout from "@/hooks/use-logout";

interface User {
  user: {
    email: string;
    name: string;
  };
}

const UserAvatar = ({ user }: { user: User }) => {
  const { logout } = useLogout();
  const handleLogout = () => logout();

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
