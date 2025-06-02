import { GoHeartFill } from "react-icons/go";
import HabitCardMenu from "./components/HabitCardMenu";

type HabitCardProps = {
  habitName: string;
};

const HabitCard = ({ habitName }: HabitCardProps) => {
  return (
    <div className="bg-card text-card-foreground mt-3 flex items-center justify-between rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <GoHeartFill className="text-2xl" />
        <p>{habitName}</p>
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" className="size-5" />
        <HabitCardMenu />
      </div>
    </div>
  );
};

export default HabitCard;
