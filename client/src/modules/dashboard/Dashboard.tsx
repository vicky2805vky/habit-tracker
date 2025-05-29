import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import HabitCard from "../habitCard/HabitCard";
const Dashboard = () => {
  return (
    <div className="space-y-5 p-3">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold md:text-xl">HELLO USER!</p>
        <Button>
          <FaPlus />
        </Button>
      </div>
      <div className="grid grid-cols-[_repeat(auto-fit,minmax(250px,1fr))] gap-3">
        <HabitCard />
        <HabitCard />
        <HabitCard />
        <HabitCard />
      </div>
      <p className="font-bold">completed</p>
      <div className="grid grid-cols-[_repeat(auto-fit,minmax(250px,1fr))] gap-3 brightness-50">
        <HabitCard />
        <HabitCard />
        <HabitCard />
        <HabitCard />
      </div>
    </div>
  );
};

export default Dashboard;
