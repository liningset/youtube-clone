import { useState } from "react";
import LogoAndBurgerButton from "./LogoAndBurgerButton";
import SearchField, { WithMobile } from "./SearchField";
import BlueSpecialButton from "../common/BlueSpecialButton";
import YoutubeIcon from "../common/YoutubeIcon";
import useDebounce from "../../hooks/useDebounce";
import { useSelector } from "react-redux";

const MobileSearchField = WithMobile(SearchField);

const Header = () => {
  const screenMatchesSM = useSelector((store) => store.app.matchMedia.sm);
  const [mobileSearchTabIsOpen, setMobileSearchTabIsOpen] = useState(false);

  const debounceState = useDebounce();

  return (
    <header className="pe-5 h-[10dvh] flex justify-between items-center sticky top-0 z-20 bg-bg-primary-low-op backdrop-blur-lg">
      {mobileSearchTabIsOpen && !screenMatchesSM && (
        <MobileSearchField
          setIsOpen={setMobileSearchTabIsOpen}
          debounceState={debounceState}
        />
      )}
      <LogoAndBurgerButton />
      {screenMatchesSM && <SearchField debounceState={debounceState} />}
      <div className="flex items-center gap-2 md:gap-4">
        {!screenMatchesSM && (
          <button
            title="Search"
            className="p-2 rounded-full cursor-pointer transition-button border-bg-primary hover:bg-grey-e8 active:bg-grey-d8  active:border-grey-d8"
            onClick={() => setMobileSearchTabIsOpen((prev) => !prev)}
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

        <BlueSpecialButton text="Sign in" />
      </div>
    </header>
  );
};
export default Header;
