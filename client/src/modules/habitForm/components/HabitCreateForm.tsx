import FormControl from "@/components/uiLayout/FormControl";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

const HabitCreateForm = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <form id="habit-form" className="space-y-5" onSubmit={handleSubmit}>
      <FormControl name="habit name" />
      <FormControl
        name="start Date"
        type="date"
        attributes={{ defaultValue: new Date().toISOString().split("T")[0] }}
      />
    </form>
  );
};

export default HabitCreateForm;
