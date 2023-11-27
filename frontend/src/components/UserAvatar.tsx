import useLogout from "@/hooks/use-logout";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import PopupAlert from "./PopupAlert";

interface User {
  user: {
    email: string;
    name: string;
    avatar: string;
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

          <AvatarImage
            src={user.user.avatar}
            alt={user.user.name}
            className="object-cover"
          />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.user.name}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>{user.user.email}</DropdownMenuLabel>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="m-2 my-4" variant="destructive">
              Log Out
            </Button>
          </AlertDialogTrigger>

          <PopupAlert type="LOGOUT" handleClick={() => handleLogout()} />
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
