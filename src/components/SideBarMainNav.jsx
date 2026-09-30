import { useContext } from "react";
import NavItem from "./NavItem";
import SideBarContext from "../utils/SideBarContext";

const SideBarMainNav = () => {
  const { expanded, outOfModal } = useContext(SideBarContext);
  return (
    <ul>
      <NavItem iconID="home" title="Home" isActive={true} />
      <NavItem iconID="shorts" title="Shorts" />
      <NavItem iconID="subscriptions" title="Subscriptions" />
      <NavItem iconID="you" title="You" />
      {(expanded || !outOfModal) && (
        <NavItem iconID="history" title="History" />
      )}
    </ul>
  );
};
export default SideBarMainNav;
