import FormControl from "@/components/uiLayout/FormControl";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormFields } from "@/constants/AuthFormSchema";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(formSchema) });
  return (
    <form id="auth-form" onSubmit={handleSubmit(() => {})}>
      <FormControl
        name="email"
        type="email"
        attributes={register("email")}
        error={errors.email?.message}
      />
      <FormControl
        name="password"
        type="password"
        attributes={register("password")}
        error={errors.password?.message}
      />
      <span className="text-xs">
        don't have and account?
        <Link to="/auth/sign-up"> signup</Link>
      </span>
      <p className="text-red-500">{errors.root?.message}</p>
    </form>
  );
};

export default SignInForm;
