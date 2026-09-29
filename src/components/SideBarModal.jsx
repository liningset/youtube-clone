import { useContext, useEffect, useRef } from "react";
import LogoAndBurgerButton from "./LogoAndBurgerButton";
import SideBar from "./SideBar";
import SideBarContext from "../utils/SideBarContext";

const SideBarModal = () => {
  const { collapsed, setCollapsed, withinModal } = useContext(SideBarContext);
  const overlayRef = useRef(null);
  const overlayClickHandler = (e) => {
    if (e.target === overlayRef.current) setCollapsed(true);
  };

  useEffect(() => {
    console.log("fired", "\nwithinModal:", withinModal);
    if (withinModal && !collapsed) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "visible";
  }, [collapsed, withinModal]);

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
