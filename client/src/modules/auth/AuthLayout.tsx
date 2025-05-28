import CardLayout from "@/components/uiLayout/CardLayout";
import { Outlet, useLocation } from "react-router";
import FormFooter from "./components/FormFooter";

const authFormContents = {
  signUp: {
    title: "Sign Up",
    description: "Enter the details to create an account",
  },
  signIn: {
    title: "Sign In",
    description: "Enter the details to sign in to your account",
  },
};

const AuthLayout = () => {
  const { pathname } = useLocation();
  const key: keyof typeof authFormContents =
    pathname.split("/").at(-1) === "sign-up" ? "signUp" : "signIn";

  console.log(pathname);

  if (pathname === "/auth/") return null;
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-[300px] md:w-[350px]">
        <CardLayout
          {...authFormContents[key]}
          Content={Outlet}
          Footer={FormFooter}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
