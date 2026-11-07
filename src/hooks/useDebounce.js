import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cacheSuggestions } from "../data/autoSuggestionsSlice";

const useDebounce = () => {
  const [search, setSearch] = useState({ search: "", fetch: true });
  const [suggested, setSuggested] = useState([]);
  const cachedResults = useSelector((store) => store.autoSuggestions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search.search?.trim() === "") {
      const resetSuggested = () => setSuggested([]);
      resetSuggested();
      return;
    }
    if (!search.fetch) return;

    const checkIfCached = () => {
      const itemInCache = cachedResults[search.search];

      if (itemInCache != null) {
        setSuggested(cachedResults[search.search]);
        return true;
      } else return false;
    };
    if (checkIfCached()) return;

    const controller = new AbortController();
    const id = setTimeout(() => {
      const fetchSuggestions = async (query) => {
        try {
          const BASE_URL = import.meta.env.VITE_SUGGESTIONS_URL;
          const params = `client=youtube&ds=yt&client=firefox&q=${query}`;
          const res = await fetch(`${BASE_URL}?${params}`, {
            signal: controller.signal,
          });
          if (!res.ok) throw new Error("res not ok");
          const data = await res.json();
          setSuggested(data[1]);

          //cache
          dispatch(
            cacheSuggestions({ search: search.search, suggestions: data[1] }),
          );
        } catch (err) {
          if (err.name === "AbortError") return;
          console.error(
            `couldn't fetch suggestions for '${search.search}'. reason: ${err.name}`,
          );
        }
      };
      fetchSuggestions(search.search);
    }, 300);

    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [search, cachedResults, dispatch]);

  return {
    search,
    suggested,
    updateSearch: (params) => setSearch(params),
    resetSearch: () => setSearch({ search: "", fetch: false }),
  };
};
export default useDebounce;
