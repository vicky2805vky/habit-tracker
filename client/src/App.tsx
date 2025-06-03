import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router";
import type { AppDispatch, RootState } from "./services/store";
import NavBar from "./modules/navigation/NavBar";
import { toast } from "sonner";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { fetchUser } from "./services/apis/auth.api";
import { getHabits } from "./services/apis/habits.api";
import { removeUser } from "./services/slices/user.slice";
import { clearHabits } from "./services/slices/habit.slice";

const App = () => {
  const theme = useSelector((state: RootState) => state.app.theme);
  const user = useSelector((state: RootState) => state.user.user);
  const appDate = useSelector((state: RootState) => state.app.appDate);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!user && !location.pathname.includes("auth")) {
      dispatch(fetchUser())
        .unwrap()
        .catch(() => {
          navigate("/auth/sign-in");
          toast("please login to continue");
        });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (user) {
      dispatch(getHabits(appDate));
    } else {
      dispatch(removeUser());
      dispatch(clearHabits());
    }
  }, [user]);

  return (
    <div
      className={`bg-secondary text-secondary-foreground h-screen space-y-5 p-5 md:p-10 ${theme}`}
    >
      <NavBar />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default App;
