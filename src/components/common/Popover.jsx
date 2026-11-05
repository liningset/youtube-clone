import { useEffect, useLayoutEffect, useRef, useState } from "react";

let lockCounter = 0;
let prevOverflow = "";

const lockScroll = () => {
  if (lockCounter === 0) {
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  lockCounter++;
};

const unlockScroll = () => {
  lockCounter--;

  if (lockCounter === 0) {
    document.body.style.overflow = prevOverflow;
  }
};

const Popover = ({ children, closePopover, parentId }) => {
  const popoverRef = useRef(null);
  const [position, setPosition] = useState(null);

  const determinePosition = () => {
    const rect = popoverRef.current.getBoundingClientRect();

    const overflows = {
      onTop: rect.top - rect.height < 0,
      onRight: rect.left + rect.width > window.innerWidth,
      onBottom: rect.top + rect.height > window.innerHeight,
      onLeft: rect.left - rect.width < 0,
    };

    const stylesX = `${overflows.onRight && (overflows.onLeft ? "left-1/2 -translate-x-1/2" : "right-full")}`;
    const stylesY = `${overflows.onBottom && (overflows.onTop ? "top-1/2 -translate-y-1/2" : "bottom-full")}`;

    setPosition(stylesX + " " + stylesY);
  };

  useEffect(() => {
    lockScroll();

    const onClick = (e) => {
      if (!e.target.closest(`[data-container-id=${parentId}]`)) closePopover();
    };
    window.addEventListener("click", onClick);

    return () => {
      unlockScroll();
      window.removeEventListener("click", onClick);
    };
  }, [closePopover, parentId]);

  useLayoutEffect(() => {
    determinePosition();
  }, []);

  return (
    <div
      ref={popoverRef}
      className={`popover ${position ?? "invisible"} absolute bg-bg-primary z-10 text-fg-primary shadow-[0px_1px_16px_rgba(40,40,40,0.4)] rounded-lg overflow-hidden py-2`}
    >
      {children}
    </div>
  );
};

export default Popover;
