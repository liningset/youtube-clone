import NavItem from "./NavItem";
import { useState } from "react";

const SideBarExploreNav = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <h3 className="p-5">Explore</h3>
      <ul className="px-4">
        <NavItem iconID="music" title="Music" />
        <NavItem iconID="live" title="Live" />
        <NavItem iconID="gaming" title="Gaming" />
        {!collapsed && (
          <>
            <NavItem iconID="news" title="News" />
            <NavItem iconID="sports" title="Sports" />
            <NavItem iconID="learning" title="Learning" />
            <NavItem iconID="memberships" title="Memberships" />
          </>
        )}
        <button
          className="w-full"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <NavItem
            iconID={collapsed ? "showMore" : "showLess"}
            title={collapsed ? "Show more" : "Show less"}
          />
        </button>
      </ul>
    </>
  );
};
export default SideBarExploreNav;
