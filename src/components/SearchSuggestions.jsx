import { useEffect, useReducer, useRef } from "react";
import YoutubeIcon from "./YoutubeIcon";

const reducer = (state, action) => {
  if (!action?.operation) return;

  if (action.operation === "increment") {
    if (action?.length == null) return state;

    return state === action.length - 1 ? 0 : state + 1;
  }
  if (action.operation === "decrement") {
    if (action?.length == null) return state;

    return state <= 0 ? action.length - 1 : state - 1;
  }
  if (action.operation === "reset") {
    return -1;
  }

  return state;
};

const SearchSuggestions = ({
  items,
  search,
  updateSearch,
  showTab,
  submitForm,
}) => {
  const [active, updateActive] = useReducer(reducer, -1);
  const ulRef = useRef(null);

  const onKeyNavigation = (e) => {
    const length = ulRef.current.children.length;

    switch (e.key) {
      case "ArrowUp":
        updateActive({ operation: "decrement", length });
        break;

      case "ArrowDown":
        updateActive({ operation: "increment", length });
        break;

      case "Escape":
        updateActive({ operation: "reset" });
        showTab(false);
        break;

      case "Enter":
        submitForm((prev) => prev + 1);
        break;

      default:
        updateActive({ operation: "reset" });
        break;
    }
  };

  const windowOnClick = (e) => {
    if (e.target.closest("form")) return;

    showTab(false);
  };

  const suggestionOnClick = (e) => {
    e.stopPropagation();
    updateSearch((prev) => ({
      search: e.target?.dataset?.suggestion ?? prev.search,
      fetch: false,
    }));
    submitForm((prev) => prev + 1);
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyNavigation);
    window.addEventListener("click", windowOnClick);

    return () => {
      window.removeEventListener("keydown", onKeyNavigation);
      window.removeEventListener("click", windowOnClick);
    };
  }, []);

  useEffect(() => {
    const listItems = ulRef.current.children;
    const current = listItems[active];

    updateSearch((prev) => ({
      search: current?.dataset?.suggestion ?? prev.search,
      fetch: false,
    }));
  }, [active]);

  return (
    <ul
      htmlFor="#searchbar"
      ref={ulRef}
      id="suggestions-container"
      className="w-[calc(100%-4rem)] shadow-sm max-h-[70vh] overflow-y-auto rounded-xl flex-col bg-bg-primary absolute p-2 left-0 z-50 top-full"
    >
      {items.map((item, i) => (
        <li
          key={i}
          data-suggestion={item}
          onClick={suggestionOnClick}
          className={`p-2 flex gap-2 rounded-lg hover:bg-grey-e8${i === active ? " bg-grey-e8" : ""}`}
        >
          <YoutubeIcon icon="search" tailwindStyles="w-5" />
          <span className="pointer-events-none">
            <b>
              {item.match(search.search) ? item.match(search.search)[0] : ""}
            </b>
            {item.replace(search.search, "")}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestions;
