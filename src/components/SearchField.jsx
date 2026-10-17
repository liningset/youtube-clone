import { useEffect, useState } from "react";
import SearchSuggestions from "./SearchSuggestions";
import YoutubeIcon from "./YoutubeIcon";
import { useNavigate } from "react-router";

const SearchField = ({ debounceState }) => {
  const [suggestTabOpen, setSuggestTabOpen] = useState(false);
  const [submitTrigger, setSubmitTrigger] = useState(0);

  const { search, suggested, resetSearch, updateSearch } = debounceState;

  const navigate = useNavigate();

  const handleKeyStrokes = (e) =>
    updateSearch({ search: e.target.value, fetch: true });

  const clearSearchHandler = (e) => {
    e.preventDefault();
    resetSearch();
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    setSubmitTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const onSearchChange = () => {
      if (!search.search?.trim()) setSuggestTabOpen(false);
      else {
        if (!suggestTabOpen) setSuggestTabOpen(true);
      }
    };
    onSearchChange();
  }, [search.search]);

  useEffect(() => {
    if (submitTrigger === 0) return;
    const submitForm = () => {
      navigate(
        "/results?" + new URLSearchParams({ q: search.search }).toString(),
      );
      setSuggestTabOpen(false);
      resetSearch();
    };
    submitForm();
  }, [submitTrigger]);

  return (
    <form
      id="searchbar"
      className="flex w-9/12 sm:w-4/12 md:w-1/2 relative z-20"
      onFocus={() => {
        if (search.search.trim() !== "") setSuggestTabOpen(true);
      }}
      onSubmit={onSubmitForm}
    >
      <div className="group border border-border-clr bg-bg-primary focus-within:border-dark-blue shadow-border-clr focus-within:shadow-inset w-full rounded-s-full flex items-center">
        <YoutubeIcon
          icon="search"
          tailwindStyles=" w-14 hidden group-focus-within:block"
        />
        <input
          type="text"
          placeholder="Search"
          className="py-2 px-4 group-focus-within:ps-0 w-full border-0 outline-0"
          onChange={(e) => handleKeyStrokes(e)}
          value={search.search}
        />
        {suggestTabOpen && (
          <SearchSuggestions
            items={suggested}
            search={search}
            updateSearch={updateSearch}
            showTab={setSuggestTabOpen}
            submitForm={setSubmitTrigger}
          />
        )}

        {search.search && (
          <button
            onClick={(e) => clearSearchHandler(e)}
            className="absolute right-16 flex items-center justify-center hover:bg-border-clr rounded-full w-10 aspect-square"
          >
            <YoutubeIcon icon="times" />
          </button>
        )}
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
  return ({ setIsOpen, debounceState }) => {
    const clickHandler = () => setIsOpen(false);

    return (
      <div className="py-2 px-5 flex items-center justify-between absolute top-0 left-0 w-full bg-bg-primary-low-op backdrop-blur-lg z-20">
        <button
          title="Back"
          className="rounded-full p-2 cursor-pointer hover:bg-grey-d8"
          onClick={clickHandler}
        >
          <YoutubeIcon icon="back" tailwindStyles="w-6 h-6" />
        </button>
        <SearchField debounceState={debounceState} />
      </div>
    );
  };
};

export default SearchField;
