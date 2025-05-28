import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import AuthMenu from "./AuthMenu";

const AuthButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <AuthMenu />
    </DropdownMenu>
  );
};

export default AuthButton;
