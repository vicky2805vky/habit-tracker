import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router";
import type { AppDispatch, RootState } from "./services/store";
import NavBar from "./modules/navigation/NavBar";
import { toast } from "sonner";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { fetchUser } from "./services/apis/auth.api";

const App = () => {
  const theme = useSelector<RootState>((state) => state.app.theme);
  const user = useSelector<RootState>((state) => state.user);
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
