import { Link } from "react-router";
import ToggleTheme from "@/components/ToggleTheme";
import AuthButton from "./components/AuthButton";

const NavBar = () => {
  return (
    <nav className="bg-card text-card-foreground flex w-full items-center justify-between rounded-full px-5 py-2 md:px-10">
      <Link to="/" className="font-bold">
        HABUILT
      </Link>

      <ul className="flex gap-3">
        <li>
          <ToggleTheme />
        </li>
        <li>
          <AuthButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
