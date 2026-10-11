import { useContext } from "react";
import YoutubeIcon from "./YoutubeIcon";
import SideBarContext from "../utils/SideBarContext";

const NavItem = ({ iconID, title, isActive = false }) => {
  const { expanded, outOfModal } = useContext(SideBarContext);
  const determineStyles = () => {
    const shared =
      "cursor-pointer flex items-center rounded-lg transition-button p-2 mx-1";
    if (!expanded && outOfModal)
      return shared.concat(
        " flex-col gap-1 hover:bg-grey-e8 hover:border-grey-e8 active:bg-grey-d8 active:border-grey-d8 px-1",
      );

    return shared.concat(
      ` flex-row gap-6 ${isActive ? "bg-grey-e8 hover:bg-grey-d8 active:bg-grey-a8 active:border-grey-a8" : "hover:bg-grey-e8 active:bg-grey-d8"}`,
    );
  };
  return (
    <li title={title} className={`border-bg-primary ${determineStyles()}`}>
      <YoutubeIcon icon={iconID} />
      <span
        className={`${!expanded && outOfModal ? "text-[0.7rem]" : "text-sm"}`}
      >
        {title}
      </span>
    </li>
  );
};
export default NavItem;
