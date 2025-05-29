import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import type { RootState } from "./services/store";
import NavBar from "./modules/navigation/NavBar";

const App = () => {
  const theme = useSelector<RootState>((state) => state.app.theme);
  return (
    <div
      className={`bg-secondary text-secondary-foreground h-screen space-y-5 p-5 md:p-10 ${theme}`}
    >
      <NavBar />
      <Outlet />
    </div>
  );
};

export default App;
