import AvatarIcon from "@/components/AvatarIcon";
import AlertDialogLayout from "@/components/uiLayout/AlertDialogLayout";
import DropDownLayout from "@/components/uiLayout/DropDownLayout";
import { GoKebabHorizontal } from "react-icons/go";

const menuItems = [
  { isModal: false, element: "Edit" },
  {
    isModal: true,
    element: (
      <AlertDialogLayout
        trigger={"Delete"}
        title="Are you absolutely sure?"
        description="this action cannot be undone."
        buttons="OK-CANCEL"
      />
    ),
  },
];

const HabitCardMenu = () => {
  const trigger = <AvatarIcon fallback={<GoKebabHorizontal />} />;
  return <DropDownLayout trigger={trigger} label="Actions" items={menuItems} />;
};

export default HabitCardMenu;
