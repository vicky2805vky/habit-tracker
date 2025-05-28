import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AvatarIcon from "../../../components/AvatarIcon";
import AuthMenu from "./AuthMenu";
import { FaUser } from "react-icons/fa";

const AuthButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarIcon fallback={<FaUser />} />
      </DropdownMenuTrigger>
      <AuthMenu />
    </DropdownMenu>
  );
};

export default AuthButton;
