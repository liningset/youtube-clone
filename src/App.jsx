import { Outlet } from "react-router";
import Header from "./components/Header";
import SideBarContext from "./utils/SideBarContext";
import useBreakpoint from "./utils/useBreakpoint";
import SideBar from "./components/SideBar";
import SideBarModal from "./components/SideBarModal";

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
      <div className="w-full flex">
        {outOfModal ? <SideBar /> : <SideBarModal />}
        <Outlet />
      </div>
    </SideBarContext.Provider>
  );
}

export default App;
