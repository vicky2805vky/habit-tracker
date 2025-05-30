import { Button } from "@/components/ui/button";
import { useLocation } from "react-router";

const FormFooter = () => {
  const { pathname } = useLocation();
  const buttonText =
    pathname.split("/").at(-1) === "sign-up" ? "create account" : "sign in";
  return (
    <div className="w-full">
      <Button className="w-full" form="auth-form">
        {buttonText}
      </Button>
    </div>
  );
};
export default FormFooter;
