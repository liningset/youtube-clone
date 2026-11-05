import { Outlet } from "react-router";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar-menu/SideBar";
import SideBarModal from "./components/sidebar-menu/SideBarModal";
import useMediaQueries from "./hooks/useMediaQueries";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  useMediaQueries();
  const sideBarType = useSelector((store) => store.sideBar.type);

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="flex w-screen">
        {sideBarType === "regular" ? <SideBar /> : <SideBarModal />}
        <Outlet />
      </div>
    </>
  );
}

export default App;
