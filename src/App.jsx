import { Outlet } from "react-router";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import SideBarModal from "./components/SideBarModal";
import useMediaQueries from "./hooks/useMediaQueries";
import { useSelector } from "react-redux";

function App() {
  useMediaQueries();
  const sideBarType = useSelector((store) => store.sideBar.type);

  return (
    <>
      <Header />
      <div className="flex w-screen">
        {sideBarType === "regular" ? <SideBar /> : <SideBarModal />}
        <Outlet />
      </div>
    </>
  );
}

export default App;
