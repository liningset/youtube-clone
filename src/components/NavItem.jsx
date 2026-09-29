import { useContext } from "react";
import YoutubeIcon from "./YoutubeIcon";
import SideBarContext from "../utils/SideBarContext";

const NavItem = ({ iconID, title, isActive = false }) => {
  const { collapsed, withinModal } = useContext(SideBarContext);
  const determineStyles = () => {
    const shared =
      "cursor-pointer flex items-center rounded-lg transition-button mx-1";
    if (collapsed && !withinModal)
      return shared.concat(
        " flex-col gap-1 hover:bg-grey-e8 hover:border-grey-e8 active:bg-grey-d8 active:border-grey-d8 py-2",
      );

    return shared.concat(
      ` py-2 px-5 flex-row gap-6 ${isActive ? "bg-grey-e8 hover:bg-grey-d8 active:bg-grey-a8 active:border-grey-a8" : "hover:bg-grey-e8 active:bg-grey-d8"}`,
    );
  };
  return (
    <li title={title} className={`border-bg-primary ${determineStyles()}`}>
      <YoutubeIcon icon={iconID} />
      <span
        className={`${collapsed && !withinModal ? "text-[0.7rem]" : "text-sm"}`}
      >
        {title}
      </span>
    </li>
  );
};
export default NavItem;
