import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ReactNode } from "react";

type avatarIconProps = {
  fallback: ReactNode;
};

const AvatarIcon = ({ fallback }: avatarIconProps) => {
  return (
    <Avatar>
      <AvatarImage src="" />
      <AvatarFallback className="text-secondary-foreground">
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarIcon;
