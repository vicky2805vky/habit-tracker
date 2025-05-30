import CardLayout from "@/components/uiLayout/CardLayout";
import HabitCreateForm from "./components/HabitCreateForm";
import HabitFormFooter from "./components/HabitFormFooter";

const HabitFormLayout = () => {
  return (
    <div className="flex h-5/6 items-center justify-center">
      <div className="w-[300px] md:w-[350px]">
        <CardLayout
          title="Create Habit"
          description="Enter the details to create a habit"
          Content={HabitCreateForm}
          Footer={HabitFormFooter}
        />
      </div>
    </div>
  );
};

export default HabitFormLayout;
