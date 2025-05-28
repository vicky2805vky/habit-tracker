import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="" />
      <AvatarFallback className="text-secondary-foreground">
        <FaUser />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
