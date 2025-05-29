import { createBrowserRouter } from "react-router";
import App from "./App";
import AuthLayout from "./modules/auth/AuthLayout";
import SignUpForm from "./modules/auth/components/SignUpForm";
import SignInForm from "./modules/auth/components/SignInForm";
import Dashboard from "./modules/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Dashboard,
      },
      {
        path: "/auth",
        Component: AuthLayout,
        children: [
          { path: "/auth/sign-up", Component: SignUpForm },
          { path: "/auth/sign-in", Component: SignInForm },
        ],
      },
    ],
  },
]);
