import { Outlet } from "react-router";
import Header from "./components/Header";
import SideBarContext from "./utils/SideBarContext";
import useBreakpoint from "./utils/useBreakpoint";

function App() {
  const { state: expanded, dispatch: setExpanded } = useBreakpoint(
    "760px",
    false,
  );
  const { state: outOfModal, dispatch: setOutOfModal } =
    useBreakpoint("1100px");

  return (
    <SideBarContext.Provider
      value={{ expanded, setExpanded, outOfModal, setOutOfModal }}
    >
      <Header />
      <Outlet />
    </SideBarContext.Provider>
  );
}

export default App;
