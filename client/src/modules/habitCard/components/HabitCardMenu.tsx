import AvatarIcon from "@/components/AvatarIcon";
import AlertDialogLayout from "@/components/uiLayout/AlertDialogLayout";
import DropDownLayout from "@/components/uiLayout/DropDownLayout";
import { deleteHabit } from "@/services/apis/habits.api";
import type { AppDispatch } from "@/services/store";
import type { MouseEventHandler } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

const HabitCardMenu = ({ id }: { id: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const deleteHandler: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(deleteHabit(id));
  };
  const menuItems = [
    {
      isModal: false,
      element: (
        <Link to={`habit/${id}/edit`} className="w-full">
          Edit
        </Link>
      ),
    },
    {
      isModal: true,
      element: (
        <AlertDialogLayout
          trigger={"Delete"}
          title="Are you absolutely sure?"
          description="this action cannot be undone."
          buttons="OK-CANCEL"
          dialogAction={deleteHandler}
        />
      ),
    },
  ];
  const trigger = <AvatarIcon fallback={<GoKebabHorizontal />} />;
  return <DropDownLayout trigger={trigger} label="Actions" items={menuItems} />;
};

export default HabitCardMenu;
