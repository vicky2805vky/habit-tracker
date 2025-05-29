import { GoHeartFill } from "react-icons/go";
import HabitCardMenu from "./components/HabitCardMenu";

const HabitCard = () => {
  return (
    <div className="bg-card text-card-foreground mt-3 flex items-center justify-between rounded-2xl p-5">
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
