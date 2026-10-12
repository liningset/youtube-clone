import { useEffect, useReducer, useRef } from "react";
import YoutubeIcon from "./YoutubeIcon";
import { Link } from "react-router";

const reducer = (state, action) => {
  if (action.operation === "increment") {
    if (action?.length == null) return state;

    return state === action.length ? 0 : state + 1;
  }
  if (action.operation === "decrement") {
    if (action?.length == null) return state;

    return state === 0 ? action.length : state - 1;
  }

  return state;
};

const SearchSuggestions = ({ items, updateSearch, showTab }) => {
  const ulRef = useRef(null);

  const [active, updateActive] = useReducer(reducer, -1);

  const onKeyNavigation = (e) => {
    const length = ulRef.current.children.length;
    if (e.key === "ArrowUp") {
      updateActive({ operation: "decrement", length });
    }
    if (e.key === "ArrowDown") {
      updateActive({ operation: "increment", length });
    }

    console.log(e);
  };
  const windowOnClick = (e) => {
    if (e.target.closest("form")) return;

    showTab(false);
  };

  const suggestionOnClick = (e) => {
    e.stopPropagation();
    updateSearch(e.target.dataset.search);
    showTab(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyNavigation);
    window.addEventListener("click", windowOnClick);

    return () => {
      window.removeEventListener("keydown", onKeyNavigation);
      window.removeEventListener("click", windowOnClick);
    };
  }, []);

  return (
    <ul
      ref={ulRef}
      id="suggestions-container"
      className="w-[calc(100%-4rem)] shadow-sm max-h-[70vh] overflow-y-auto rounded-xl flex-col bg-bg-primary absolute p-2 left-0 z-50 top-full"
    >
      {items.map((item, i) => (
        <Link to={`/results?q=${encodeURIComponent(item)}`}>
          <li
            key={i}
            data-index={i}
            onClick={suggestionOnClick}
            className={`p-2 flex gap-2 rounded-lg hover:bg-grey-e8${i === active ? " bg-grey-e8" : ""}`}
          >
            <YoutubeIcon icon="search" tailwindStyles="w-5" />
            <span className="pointer-events-none">{item}</span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default SearchSuggestions;
