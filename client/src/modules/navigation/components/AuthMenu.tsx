import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/services/apis/auth.api";
import type { AppDispatch, RootState } from "@/services/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const AuthMenu = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    dispatch(signOutUser()).then(() => {
      navigate("/auth/sign-in");
    });
  };
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {user ? (
        <>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={signOut}>Signout</DropdownMenuItem>
        </>
      ) : (
        <>
          <Link to="/auth/sign-in">
            <DropdownMenuItem>Signin</DropdownMenuItem>
          </Link>
          <Link to="/auth/sign-up">
            <DropdownMenuItem>Signup</DropdownMenuItem>
          </Link>
        </>
      )}
    </DropdownMenuContent>
  );
};

export default AuthMenu;
