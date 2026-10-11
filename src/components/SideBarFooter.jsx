const SideBarFooter = () => {
  return (
    <footer className="p-5 flex flex-col gap-6 border-t border-border-clr">
      <ul className="flex text-sm gap-1 flex-wrap text-grey-31">
        <li>About</li>
        <li>Press</li>
        <li>Copyright</li>
        <li>Contact us</li>
        <li>Creators</li>
        <li>Advertise</li>
        <li>Developers</li>
      </ul>
      <ul className="flex text-sm gap-1 text-grey-31 flex-wrap">
        <li>Terms</li>
        <li>Privacy Policy & Safety</li>
        <li>How YouTube works</li>
        <li>Contact us</li>
        <li>Test new features</li>
      </ul>

      <span className="text-grey-31 text-xs">© 2026 Google LLC</span>
    </footer>
  );
};
export default SideBarFooter;
