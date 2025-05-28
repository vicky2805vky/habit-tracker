import FormControl from "@/components/uiLayout/FormControl";
import { Link } from "react-router";

const SignUpForm = () => {
  return (
    <form className="space-y-3">
      <FormControl name="username" />
      <FormControl name="email" type="email" />
      <FormControl name="password" type="password" />
      <span className="text-xs">
        already have and account?
        <Link to="/auth/sign-in"> signin</Link>
      </span>
    </form>
  );
};
export default SignUpForm;
