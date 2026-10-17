import { useContext } from "react";
import NavItem from "./NavItem";
import SideBarContext from "../utils/SideBarContext";
import { Link } from "react-router";

const SideBarMainNav = () => {
  const { expanded, outOfModal } = useContext(SideBarContext);
  return (
    <ul className={expanded || !outOfModal ? "px-4" : ""}>
      <Link to="/">
        <NavItem iconID="home" title="Home" isActive={true} />
      </Link>
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
