import { useEffect, useRef } from "react";
import LogoAndBurgerButton from "../header/LogoAndBurgerButton";
import { closeSideBar } from "../../data/sideBarSlice";
import { useDispatch, useSelector } from "react-redux";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const opened = useSelector((store) => store.sideBar.opened);
  const overlayRef = useRef(null);

  const overlayClickHandler = (e) => {
    if (e.target === overlayRef.current)
      dispatch(closeSideBar({ asUser: true }));
  };

  useEffect(() => {
    document.body.style.overflow = opened ? "hidden" : "visible";

    //not doing this tripped me up for two days
    return () => (document.body.style.overflow = "visible");
  }, [opened]);

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 transition-colors duration-200 ${!opened ? "bg-transparent pointer-events-none" : "bg-border-clr pointer-events-auto"}`}
      onClick={overlayClickHandler}
    >
      <aside
        className={`flex flex-col bg-bg-primary duration-200 left-0 w-60 absolute ${!opened ? "-translate-x-60" : "translate-x-0"}`}
      >
        <LogoAndBurgerButton />
        {children}
      </aside>
    </div>
  );
};
export default Modal;
