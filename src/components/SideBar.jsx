import { useContext } from "react";
import SideBarExploreNav from "./SideBarExploreNav";
import SideBarMainNav from "./SideBarMainNav";
import SignInButton from "./SignInButton";
import SideBarContext from "../utils/SideBarContext";
import SideBarFooter from "./SideBarFooter";

const SideBar = () => {
  const { expanded, outOfModal } = useContext(SideBarContext);
  return (
    <nav
      className={`h-[90dvh] bg-bg-primary overflow-auto shrink-0 sticky top-[10dvh] ${!expanded ? "w-fit" : "w-60"}`}
    >
      {!expanded && outOfModal ? (
        <SideBarMainNav />
      ) : (
        <>
          <SideBarMainNav />
          <div className="flex flex-col gap-2 items-start border-y my-2 p-5 border-border-clr">
            <span className="text-sm">
              Sign in to like videos, comment and subscribe.
            </span>
            <SignInButton />
          </div>
          <SideBarExploreNav />
          <SideBarFooter />
        </>
      )}
    </nav>
  );
};

export default SideBar;
