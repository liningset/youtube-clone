import NavItem from "./NavItem";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const SideBarMainNav = () => {
  const { type, opened } = useSelector((store) => store.sideBar);

  return (
    <ul className={opened || type === "modal" ? "px-4" : ""}>
      <Link to="/">
        <NavItem iconID="home" title="Home" isActive={true} />
      </Link>
      <NavItem iconID="shorts" title="Shorts" />
      <NavItem iconID="subscriptions" title="Subscriptions" />
      <NavItem iconID="you" title="You" />
      {(opened || type === "modal") && (
        <NavItem iconID="history" title="History" />
      )}
    </ul>
  );
};
export default SideBarMainNav;
