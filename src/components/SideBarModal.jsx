import { useContext, useEffect, useRef } from "react";
import LogoAndBurgerButton from "./LogoAndBurgerButton";
import SideBar from "./SideBar";
import SideBarContext from "../utils/SideBarContext";

const SideBarModal = () => {
  const { collapsed, setCollapsed } = useContext(SideBarContext);
  const overlayRef = useRef(null);
  const overlayClickHandler = (e) => {
    if (e.target === overlayRef.current) setCollapsed(true);
  };

  useEffect(() => {
    document.body.style.overflow = !collapsed ? "hidden" : "visible";

    //not doing this tripped me up for two days
    return () => (document.body.style.overflow = "visible");
  }, [collapsed]);

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 transition-colors duration-200 ${collapsed ? "bg-transparent pointer-events-none" : "bg-border-clr pointer-events-auto"}`}
      onClick={overlayClickHandler}
    >
      <aside
        className={`flex flex-col bg-bg-primary duration-200 left-0 w-56 absolute ${collapsed ? "-translate-x-56" : "translate-x-0"}`}
      >
        <LogoAndBurgerButton />
        <SideBar />
      </aside>
    </div>
  );
};
export default SideBarModal;
