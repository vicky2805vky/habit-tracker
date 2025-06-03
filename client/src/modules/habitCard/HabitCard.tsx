import { GoHeartFill } from "react-icons/go";
import HabitCardMenu from "./components/HabitCardMenu";
import { useDispatch, useSelector } from "react-redux";
import { markHabit } from "@/services/apis/habits.api";
import type { AppDispatch, RootState } from "@/services/store";

type HabitCardProps = {
  habitId: string;
  habitName: string;
  completed: boolean;
};

const HabitCard = ({ habitId, habitName, completed }: HabitCardProps) => {
  const date = useSelector((state: RootState) => state.app.appDate);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="bg-card text-card-foreground mt-3 flex items-center justify-between rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <GoHeartFill className="text-2xl" />
        <p>{habitName}</p>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="size-5"
          checked={completed}
          onChange={(e) => {
            const completed = e.target.checked;
            dispatch(markHabit({ habitId, date, completed }));
          }}
        />
        <HabitCardMenu id={habitId} />
      </div>
    </div>
  );
};

export default HabitCard;
