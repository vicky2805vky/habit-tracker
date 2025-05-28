import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../services/slices/app.slice";
import { Button } from "./ui/button";
import { IoSunny } from "react-icons/io5";
import { BsMoonStarsFill } from "react-icons/bs";
import type { RootState } from "@/services/store";

const ToggleTheme = () => {
  const theme = useSelector<RootState>((state) => state.app.theme);
  const dispatch = useDispatch();
  const changeTheme = () => {
    dispatch(toggleTheme({}));
  };
  return (
    <Button
      size="icon"
      variant="outline"
      className="rounded-full border-none"
      onClick={changeTheme}
    >
      {theme === "dark" ? <BsMoonStarsFill /> : <IoSunny />}
      <p className="sr-only">toggle theme</p>
    </Button>
  );
};

export default ToggleTheme;
