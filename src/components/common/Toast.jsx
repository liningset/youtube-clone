import { useEffect } from "react";

const Toast = ({ type, discard, children }) => {
  useEffect(() => {
    const id = setTimeout(() => {
      discard();
    }, 3000);
    console.log("ran this many times");

    return () => clearTimeout(id);
  }, [discard]);

  return (
    <div
      className={`fixed z-50 bg-bg-primary bottom-2 left-2 shadow-[0px_1px_16px_rgba(40,40,40,0.4)] flex items-center gap-2 rounded-lg p-4 border-x-2 ${type === "error" ? "border-red-500" : "border-blue-500"}`}
    >
      <span className="text-xs">{children}</span>
    </div>
  );
};

export default Toast;
