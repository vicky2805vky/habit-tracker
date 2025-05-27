import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import type { RootState } from "./services/store";

const App = () => {
  const theme = useSelector<RootState>((state) => state.app.theme);
  return (
    <div className={`bg-secondary h-screen ${theme}`}>
      <Outlet />
    </div>
  );
};

export default App;
