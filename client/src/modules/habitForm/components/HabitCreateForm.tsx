import { DatePicker } from "@/components/DatePicker";
import FormControl from "@/components/uiLayout/FormControl";
import { habitSchema, type HabitSchema } from "@/constants/HabitFormSchema";
import { postHabit } from "@/services/apis/habits.api";
import type { AppDispatch } from "@/services/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const HabitCreateForm = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const onSubmit: SubmitHandler<HabitSchema> = (data) => {
    dispatch(postHabit(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<HabitSchema>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      startDate: new Date().toISOString(),
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
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="capitalize">
          start Date
        </label>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              description=""
              value={new Date(field.value)}
              onChange={(date) => {
                if (date) {
                  const isoDate = new Date(date).toISOString();
                  field.onChange(isoDate);
                }
              }}
            />
          )}
        />
        <p className="text-red-500">{errors.startDate?.message}</p>
      </div>
      <p className="text-red-500">{errors.root?.message}</p>
    </form>
  );
};

export default HabitCreateForm;
