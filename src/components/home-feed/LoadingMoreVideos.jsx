import { useContext } from "react";
import useScrollObserver from "../../hooks/useScrollObserver";
import { VideoCardsListShimmer } from "./VideoCardsList";
import PaginationContext from "../../data/PaginationContext";
import Spinner from "../common/Spinner";

const LoadingMoreVideos = () => {
  const { fetchNext } = useContext(PaginationContext);
  const containerRef = useScrollObserver(fetchNext);
  return (
    <div ref={containerRef} className="flex flex-col gap-8">
      <VideoCardsListShimmer count={3} />
      <Spinner />
    </div>
  );
};

export default LoadingMoreVideos;
