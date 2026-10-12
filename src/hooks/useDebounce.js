import { useEffect, useState } from "react";

const useDebounce = () => {
  const [search, setSearch] = useState("");
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    const id = setTimeout(() => {
      const fetchSuggestions = async (query) => {
        if (search === "") {
          setSuggested([]);
          return;
        }
        const BASE_URL = import.meta.env.VITE_SUGGESTIONS_URL;
        const params = `client=youtube&ds=yt&client=firefox&q=${query}`;
        const res = await fetch(`${BASE_URL}?${params}`);
        const data = await res.json();
        setSuggested(data[1]);
      };
      fetchSuggestions(search, setSuggested);
    }, 400);

    return () => clearTimeout(id);
  }, [search]);

  return {
    search,
    suggested,
    updateSearch: (d) => setSearch(d),
    resetSearch: () => setSearch(""),
  };
};
export default useDebounce;
