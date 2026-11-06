import ExploreNav from "./ExploreNav";
import MainNav from "./MainNav";
import BlueSpecialButton from "../common/BlueSpecialButton";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { type, opened } = useSelector((store) => store.sideBar);
  return (
    <nav
      className={`h-[90dvh] bg-bg-primary overflow-auto shrink-0 sticky top-[10dvh] ${!opened ? "w-fit" : "w-60"}`}
    >
      {!opened && type === "regular" ? (
        <MainNav />
      ) : (
        <>
          <MainNav />
          <div className="flex flex-col gap-2 items-start border-y my-2 p-5 border-border-clr">
            <span className="text-sm">
              Sign in to like videos, comment and subscribe.
            </span>
            <BlueSpecialButton text="Sign in" />
          </div>
          <ExploreNav />
          <Footer />
        </>
      )}
    </nav>
  );
};

export default SideBar;
