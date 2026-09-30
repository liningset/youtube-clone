import { useContext, useEffect, useRef } from "react";
import LogoAndBurgerButton from "./LogoAndBurgerButton";
import SideBar from "./SideBar";
import SideBarContext from "../utils/SideBarContext";

const SideBarModal = () => {
  const { expanded, setExpanded } = useContext(SideBarContext);
  const overlayRef = useRef(null);
  const overlayClickHandler = (e) => {
    if (e.target === overlayRef.current) setExpanded(false);
  };

  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "visible";

    //not doing this tripped me up for two days
    return () => (document.body.style.overflow = "visible");
  }, [expanded]);

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 transition-colors duration-200 ${!expanded ? "bg-transparent pointer-events-none" : "bg-border-clr pointer-events-auto"}`}
      onClick={overlayClickHandler}
    >
      <aside
        className={`flex flex-col bg-bg-primary duration-200 left-0 w-56 absolute ${!expanded ? "-translate-x-56" : "translate-x-0"}`}
      >
        <LogoAndBurgerButton />
        <SideBar />
      </aside>
    </div>
  );
};
export default SideBarModal;
