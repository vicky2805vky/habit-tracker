import FormControl from "@/components/uiLayout/FormControl";
import { habitSchema, type HabitSchema } from "@/constants/HabitFormSchema";
import { updateHabit } from "@/services/apis/habits.api";
import type { AppDispatch, RootState } from "@/services/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const HabitEditForm = () => {
  const { habitId } = useParams<{ habitId: string }>();
  const habit = useSelector((state: RootState) =>
    state.habits.find((habit) => habit.habitId === habitId),
  );
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const onSubmit: SubmitHandler<HabitSchema> = (data) => {
    dispatch(updateHabit({ ...data, id: habitId! }))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<HabitSchema>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      habitName: habit?.habitName,
      startDate: new Date(habit?.startDate || Date.now())
        .toISOString()
        .split("T")[0],
    },
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

export default HabitEditForm;
