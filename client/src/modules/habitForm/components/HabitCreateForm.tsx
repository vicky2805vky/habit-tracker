import FormControl from "@/components/uiLayout/FormControl";
import { habitSchema, type HabitSchema } from "@/constants/HabitFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

const HabitCreateForm = () => {
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<HabitSchema> = () => {
    navigate("/");
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<HabitSchema>({
    resolver: zodResolver(habitSchema),
  });
  return (
    <form
      id="habit-form"
      className="space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl
        name="habit name"
        attributes={register("habitName")}
        error={errors.habitName?.message}
      />
      <FormControl
        name="start Date"
        type="date"
        attributes={{
          ...register("startDate"),
          defaultValue: new Date().toISOString().split("T")[0],
        }}
        error={errors.startDate?.message}
      />
      <p className="text-red-500">{errors.root?.message}</p>
    </form>
  );
};

export default HabitCreateForm;
