import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { updateCurrentPage } from "../utils/appSlice";

const SearchPage = () => {
  const query = useSearchParams()[0].get("q");
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = query + " - YouTube-clone";
    dispatch(updateCurrentPage());
  }, []);

  return <div>you searched for {query}</div>;
};

export default SearchPage;
