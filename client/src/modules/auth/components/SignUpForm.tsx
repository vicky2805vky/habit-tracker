import FormControl from "@/components/uiLayout/FormControl";
import {
  extendedFormSchema,
  type ExtendedFormFields,
} from "@/constants/AuthFormSchema";
import { signUpUser } from "@/services/apis/auth.api";
import type { AppDispatch } from "@/services/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ExtendedFormFields>({
    resolver: zodResolver(extendedFormSchema),
  });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const signup: SubmitHandler<ExtendedFormFields> = (data) => {
    dispatch(signUpUser(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };
  return (
    <form className="space-y-3" id="auth-form" onSubmit={handleSubmit(signup)}>
      <FormControl
        name="username"
        attributes={{
          ...register("userName"),
        }}
        error={errors.userName?.message}
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
