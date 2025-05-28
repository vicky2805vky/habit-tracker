import AvatarIcon from "@/components/AvatarIcon";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoHeartFill, GoKebabHorizontal } from "react-icons/go";

const HabitCard = () => {
  return (
    <div className="bg-card text-card-foreground mt-3 flex w-2/6 items-center justify-between rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <GoHeartFill className="text-2xl" />
        <p>Habit Name</p>
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" className="size-5" checked />
        <HabitCardMenu />
      </div>
    </div>
  );
};

export default HabitCard;

const HabitCardMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarIcon fallback={<GoKebabHorizontal />} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
