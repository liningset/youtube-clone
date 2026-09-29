import { useEffect, useState } from "react";
import LogoAndBurgerButton from "./LogoAndBurgerButton";
import SearchField, { WithMobile } from "./SearchField";
import SignInButton from "./SignInButton";
import YoutubeIcon from "./YoutubeIcon";

const MobileSearchField = WithMobile(SearchField);

const Header = () => {
  const [screenIsLarge, setScreenIsLarge] = useState(
    matchMedia("(min-width:640px)").matches,
  );
  const [mobileSearchTabIsOpen, setMobileSearchTabIsOpen] = useState(false);

  const onMobileSearchClick = () =>
    setMobileSearchTabIsOpen(!mobileSearchTabIsOpen);

  useEffect(() => {
    const mediaQuery = matchMedia("(min-width:640px)");
    const onChange = (e) => setScreenIsLarge(e.matches);
    mediaQuery.onchange = onChange;

    return () => (mediaQuery.onchange = null);
  }, []);

  return (
    <header className="pe-5 flex justify-between items-center sticky top-0 z-10 bg-bg-primary">
      {mobileSearchTabIsOpen && !screenIsLarge && (
        <MobileSearchField setIsOpen={setMobileSearchTabIsOpen} />
      )}
      <LogoAndBurgerButton />
      {screenIsLarge && <SearchField />}
      <div className="flex items-center gap-2 md:gap-4">
        {!screenIsLarge && (
          <button
            title="Search"
            className="p-2 rounded-full cursor-pointer transition-button border-bg-primary hover:bg-grey-e8 active:bg-grey-d8  active:border-grey-d8"
            onClick={onMobileSearchClick}
          >
            <YoutubeIcon icon="search" />
          </button>
        )}
        <button
          title="Settings"
          className="p-2 rounded-full cursor-pointer transition-button border-bg-primary active:bg-grey-e8  active:border-grey-e8"
        >
          <YoutubeIcon icon="three-dots" />
        </button>

        <SignInButton />
      </div>
    </header>
  );
};
export default Header;
