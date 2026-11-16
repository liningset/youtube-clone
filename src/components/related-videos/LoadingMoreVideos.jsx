import { useContext } from "react";
import useScrollObserver from "../../hooks/useScrollObserver";
import { RelatedVideoCardsListShimmer } from "./RelatedVideoCardsList";
import Spinner from "../common/Spinner";
import SearchPageContext from "../../data/SearchPageContext";

const LoadingMoreVideos = () => {
  const { fetchNextSearch } = useContext(SearchPageContext);
  const containerRef = useScrollObserver(fetchNextSearch);
  return (
    <div ref={containerRef} className="flex flex-col gap-8">
      <RelatedVideoCardsListShimmer count={3} />
      <Spinner />
    </div>
  );
};

export default LoadingMoreVideos;
