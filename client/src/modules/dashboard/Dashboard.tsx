import { buttonVariants } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import HabitCard from "../habitCard/HabitCard";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import type { RootState } from "@/services/store";
const Dashboard = () => {
  const userName = useSelector((state: RootState) => state.user.user?.userName);
  const habits = useSelector((state: RootState) => state.habits);
  return (
    <div className="space-y-5 p-3">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold md:text-xl">
          HELLO {userName?.toUpperCase()}!
        </p>
        <Link to="/habit/create" className={cn(buttonVariants())}>
          <FaPlus />
        </Link>
      </div>
      <div className="grid grid-cols-[_repeat(auto-fit,minmax(250px,1fr))] gap-3">
        {habits.map(({ habitId, habitName, completed }) => (
          <HabitCard key={habitId} {...{ habitName, habitId, completed }} />
        ))}
      </div>
      <p className="font-bold">completed</p>
      <div className="grid grid-cols-[_repeat(auto-fit,minmax(250px,1fr))] gap-3 brightness-50"></div>
    </div>
  );
};

export default Dashboard;
