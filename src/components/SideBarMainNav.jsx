import { useContext } from "react";
import NavItem from "./NavItem";
import SideBarContext from "../utils/SideBarContext";

const SideBarMainNav = () => {
  const { collapsed, withinModal } = useContext(SideBarContext);
  return (
    <ul>
      <NavItem iconID="home" title="Home" isActive={true} />
      <NavItem iconID="shorts" title="Shorts" />
      <NavItem iconID="subscriptions" title="Subscriptions" />
      <NavItem iconID="you" title="You" />
      {(!collapsed || withinModal) && (
        <NavItem iconID="history" title="History" />
      )}
    </ul>
  );
};
export default SideBarMainNav;
