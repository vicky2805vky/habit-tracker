import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";

const AuthMenu = () => {
  return (
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <Link to="/auth/sign-in">
        <DropdownMenuItem>Signin</DropdownMenuItem>
      </Link>
      <Link to="/auth/sign-up">
        <DropdownMenuItem>Signup</DropdownMenuItem>
      </Link>
      <DropdownMenuItem>Signout</DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default AuthMenu;
