import { useContext } from "react";
import SideBarExploreNav from "./SideBarExploreNav";
import SideBarMainNav from "./SideBarMainNav";
import SignInButton from "./SignInButton";
import SideBarContext from "../utils/SideBarContext";

const SideBar = () => {
  const { collapsed } = useContext(SideBarContext);
  return (
    <nav
      className={`h-screen overflow-auto sticky top-15 ${collapsed ? "w-fit" : "w-56"}`}
    >
      {collapsed ? (
        <SideBarMainNav />
      ) : (
        <>
          <SideBarMainNav />
          <div className="flex flex-col gap-2 items-start border-y my-2 p-4 border-border-clr">
            <span>Sign in to like videos, comment and subscribe.</span>
            <SignInButton />
          </div>
          <SideBarExploreNav />
        </>
      )}
    </nav>
  );
};

export default SideBar;
