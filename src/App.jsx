import { Outlet } from "react-router";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar-menu/SideBar";
import Modal from "./components/sidebar-menu/Modal";
import useMediaQueries from "./hooks/useMediaQueries";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "./components/common/ScrollToTop";
import { useEffect } from "react";
import getUserCountry from "./utils/getUserCountry";
import { updateCountryCode } from "./data/appSlice";

function App() {
  useMediaQueries();
  const sideBarType = useSelector((store) => store.sideBar.type);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCountryInStore = async () => {
      const code = await getUserCountry();
      dispatch(updateCountryCode(code));
    };
    setCountryInStore();
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="flex w-screen">
        {sideBarType === "regular" ? (
          <SideBar />
        ) : (
          <Modal>
            <SideBar />
          </Modal>
        )}
        <Outlet />
      </div>
    </>
  );
}

export default App;
