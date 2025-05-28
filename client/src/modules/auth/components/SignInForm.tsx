import FormControl from "@/components/uiLayout/FormControl";
import { Link } from "react-router";

const SignInForm = () => {
  return (
    <div>
      <FormControl name="email" type="email" />
      <FormControl name="password" type="password" />
      <span className="text-xs">
        don't have and account?
        <Link to="/auth/sign-up"> signup</Link>
      </span>
    </div>
  );
};

export default SignInForm;
