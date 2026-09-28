import NavItem from "./NavItem";

const SideBarExploreNav = () => {
  return (
    <>
      <h3>Explore</h3>
      <ul>
        <NavItem iconID="music" title="Music" />
        <NavItem iconID="live" title="Live" />
        <NavItem iconID="gaming" title="Gaming" />
        <NavItem iconID="news" title="News" />
        <NavItem iconID="sports" title="Sports" />
        <NavItem iconID="learning" title="Learning" />
        <NavItem iconID="memberships" title="Memberships" />
        <NavItem iconID="show-more" title="Show more" />
      </ul>
    </>
  );
};
export default SideBarExploreNav;
