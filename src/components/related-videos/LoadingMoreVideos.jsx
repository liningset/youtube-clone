import { useContext } from "react";
import useScrollObserver from "../../hooks/useScrollObserver";
import { RelatedVideoCardsListShimmer } from "./RelatedVideoCardsList";
import PaginationContext from "../../data/PaginationContext";
import Spinner from "../common/Spinner";

const LoadingMoreVideos = () => {
  const { fetchNext } = useContext(PaginationContext);
  const containerRef = useScrollObserver(fetchNext);
  return (
    <div ref={containerRef} className="flex flex-col gap-8">
      <RelatedVideoCardsListShimmer count={3} />
      <Spinner />
    </div>
  );
};

export default LoadingMoreVideos;
