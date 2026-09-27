import { useEffect } from "react";
import YoutubeIcon from "./YoutubeIcon";

const SearchField = () => {
  return (
    <form className="flex w-9/12 sm:w-4/12 md:w-1/2">
      <div className="border border-border-clr w-full rounded-s-full">
        <input
          type="text"
          placeholder="Search"
          className="py-2 px-4 w-full border-0 outline-0"
        />
      </div>
      <button
        type="submit"
        title="Search"
        className="cursor-pointer bg-grey-f8 hover:bg-grey-e8 flex items-center justify-center w-16 rounded-e-full border border-border-clr border-s-0"
      >
        <YoutubeIcon icon="search" />
      </button>
    </form>
  );
};

export const WithMobile = (SearchField) => {
  return ({ setIsOpen }) => {
    const clickHandler = () => setIsOpen(false);

    useEffect(() => {
      const mediaQuery = matchMedia("(min-width:640px)");
      const onChange = (e) => {
        setIsOpen(!e.matches);
        console.log(e);
      };
      mediaQuery.onchange = onChange;

      return () => (mediaQuery.onchange = null);
    }, []);

    return (
      <div className="py-2 px-5 flex items-center justify-between absolute top-0 left-0 w-full bg-bg-primary z-20">
        <button
          title="Back"
          className="rounded-full p-2 cursor-pointer hover:bg-grey-d8"
          onClick={clickHandler}
        >
          <YoutubeIcon icon="back" tailwindStyles="w-6 h-6" />
        </button>
        <SearchField />
      </div>
    );
  };
};

export default SearchField;
