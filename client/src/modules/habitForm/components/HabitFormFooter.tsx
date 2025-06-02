import { Button } from "@/components/ui/button";
import { useLocation } from "react-router";

const HabitFormFooter = () => {
  const location = useLocation();
  const formType = location.pathname.includes("edit") ? "edit" : "create";
  return (
    <Button type="submit" form="habit-form" className="w-full">
      {formType} habit
    </Button>
  );
};

export default HabitFormFooter;
