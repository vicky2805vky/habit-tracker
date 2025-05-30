import FormControl from "@/components/uiLayout/FormControl";
import {
  extendedFormSchema,
  type ExtendedFormFields,
} from "@/constants/AuthFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ExtendedFormFields>({
    resolver: zodResolver(extendedFormSchema),
  });
  return (
    <form
      className="space-y-3"
      id="auth-form"
      onSubmit={handleSubmit(() => {})}
    >
      <FormControl
        name="username"
        attributes={{
          ...register("username"),
        }}
        error={errors.username?.message}
      />
      <FormControl
        name="email"
        type="email"
        attributes={{ ...register("email") }}
        error={errors.email?.message}
      />
      <FormControl
        name="password"
        type="password"
        attributes={{ ...register("password") }}
        error={errors.password?.message}
      />
      <span className="text-xs">
        already have and account?
        <Link to="/auth/sign-in"> signin</Link>
      </span>
      <p className="text-red-500">{errors.root?.message}</p>
    </form>
  );
};
export default SignUpForm;
