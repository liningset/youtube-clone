import { useEffect } from "react";

const Popover = ({ children, setShowPopover }) => {
  useEffect(() => {
    const onClick = (e) => {
      if (!e.target.closest(".popover-container")) setShowPopover(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div className="popover absolute bg-bg-primary text-fg-primary shadow-xl rounded-lg">
      {children}
    </div>
  );
};

export default Popover;
