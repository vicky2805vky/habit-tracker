import CardLayout from "@/components/uiLayout/CardLayout";
import HabitFormFooter from "./components/HabitFormFooter";
import { Outlet, useLocation } from "react-router";

const HabitFormLayout = () => {
  const location = useLocation();
  const formType = location.pathname.includes("edit") ? "edit" : "create";
  return (
    <div className="flex h-5/6 items-center justify-center">
      <div className="w-[300px] md:w-[350px]">
        <CardLayout
          title={`${formType} Habit`}
          description={`Enter the details to ${formType} a habit`}
          Content={Outlet}
          Footer={HabitFormFooter}
        />
      </div>
    </div>
  );
};

export default HabitFormLayout;
