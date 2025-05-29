import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ReactNode } from "react";

type dropDownLayoutProps = {
  trigger: ReactNode;
  label: string;
  items: {
    isModal: boolean;
    element: ReactNode;
  }[];
};

const DropDownLayout = ({ trigger, label, items }: dropDownLayoutProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuItem
            onSelect={(e) => {
              item.isModal && e.preventDefault();
            }}
          >
            {item.element}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownLayout;
