import { useState } from "react";
import LogoAndBurgerButton from "./LogoAndBurgerButton";
import SearchField, { WithMobile } from "./SearchField";
import SignInButton from "./SignInButton";
import YoutubeIcon from "./YoutubeIcon";
import useBreakpoint from "../hooks/useBreakpoint";

const MobileSearchField = WithMobile(SearchField);

const Header = () => {
  const { state: screenIsLarge } = useBreakpoint("640px");
  const [mobileSearchTabIsOpen, setMobileSearchTabIsOpen] = useState(false);
  const onMobileSearchClick = () => setMobileSearchTabIsOpen((prev) => !prev);

  return (
    <header className="pe-5 h-[10dvh] flex justify-between items-center sticky top-0 z-10 bg-bg-primary-low-op backdrop-blur-lg">
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
          <YoutubeIcon icon="threeDots" />
        </button>

        <SignInButton />
      </div>
    </header>
  );
};
export default Header;
