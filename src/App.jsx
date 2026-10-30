import { Outlet } from "react-router";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import SideBarModal from "./components/SideBarModal";
import useMediaQueries from "./hooks/useMediaQueries";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";

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
