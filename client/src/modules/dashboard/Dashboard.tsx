import { buttonVariants } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import HabitCard from "../habitCard/HabitCard";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/services/store";
import { setAppDate } from "@/services/slices/app.slice";
import { DatePicker } from "@/components/DatePicker";
const Dashboard = () => {
  const userName = useSelector((state: RootState) => state.user.user?.userName);
  const appDate = useSelector((state: RootState) => state.app.appDate);
  const habits = useSelector((state: RootState) => state.habits);
  const completedHabits = habits.filter((habit) => {
    if (!habit.completed) return false;
    const habitDate = new Date(habit.startDate);
    const selectedDate = new Date(appDate);
    return selectedDate > habitDate;
  });
  const inCompleteHabits = habits.filter((habit) => {
    if (habit.completed) return false;
    const habitDate = new Date(habit.startDate);
    const selectedDate = new Date(appDate);
    return selectedDate > habitDate;
  });
  const dispatch = useDispatch();
  return (
    <div className="space-y-5 p-3">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold md:text-xl">
          HELLO {userName?.toUpperCase()}!
        </p>
        <DatePicker
          value={new Date(appDate)}
          onChange={(e) => {
            if (!e) return;
            const date = new Date(e.setDate(e.getDay() + 1)).toISOString();
            dispatch(setAppDate(date));
          }}
        />
        <Link to="/habit/create" className={cn(buttonVariants())}>
          <FaPlus />
        </Link>
      </div>
      <div className="grid grid-cols-[_repeat(auto-fit,minmax(250px,1fr))] gap-3">
        {inCompleteHabits.map(({ habitId, habitName, completed }) => (
          <HabitCard key={habitId} {...{ habitName, habitId, completed }} />
        ))}
      </div>
      <p className="font-bold">completed</p>
      <div className="grid grid-cols-[_repeat(auto-fit,minmax(250px,1fr))] gap-3 brightness-50">
        {completedHabits.map(({ habitId, habitName, completed }) => (
          <HabitCard key={habitId} {...{ habitName, habitId, completed }} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
