import { useEffect, useState } from "react";
import LogoAndBurgerButton from "./LogoAndBurgerButton";
import SearchField, { WithMobile } from "./SearchField";
import SignInButton from "./SignInButton";
import YoutubeIcon from "./YoutubeIcon";

const Header = () => {
  const [screenIsLarge, setScreenIsLarge] = useState(
    matchMedia("(min-width:640px)").matches,
  );
  const [mobileSearchTabIsOpen, setMobileSearchTabIsOpen] = useState(false);

  const MobileSearchField = WithMobile(SearchField);

  const onMobileSearchClick = () =>
    setMobileSearchTabIsOpen(!mobileSearchTabIsOpen);

  useEffect(() => {
    const mediaQuery = matchMedia("(min-width:640px)");
    const onChange = (e) => setScreenIsLarge(e.matches);
    mediaQuery.onchange = onChange;

    return () => (mediaQuery.onchange = null);
  }, []);

  return (
    <header className="py-2 px-5 flex justify-between items-center relative">
      {mobileSearchTabIsOpen && (
        <MobileSearchField setIsOpen={setMobileSearchTabIsOpen} />
      )}
      <LogoAndBurgerButton />
      {screenIsLarge && <SearchField />}
      <div className="flex items-center gap-4">
        <button
          title="Settings"
          className="p-2 rounded-full cursor-pointer active:bg-grey-e8"
        >
          <YoutubeIcon icon="three-dots" />
        </button>
        {!screenIsLarge && (
          <button
            title="Search"
            className="p-2 rounded-full cursor-pointer active:bg-grey-e8"
            onClick={onMobileSearchClick}
          >
            <YoutubeIcon icon="search" />
          </button>
        )}

        <SignInButton />
      </div>
    </header>
  );
};
export default Header;
