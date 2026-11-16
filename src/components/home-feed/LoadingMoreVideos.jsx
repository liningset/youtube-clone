import { useContext } from "react";
import useScrollObserver from "../../hooks/useScrollObserver";
import { VideoCardsListShimmer } from "./VideoCardsList";
import HomePageContext from "../../data/HomePageContext";
import Spinner from "../common/Spinner";

const LoadingMoreVideos = () => {
  const { fetchNext } = useContext(HomePageContext);
  const containerRef = useScrollObserver(fetchNext);
  return (
    <div ref={containerRef} className="flex flex-col gap-8">
      <VideoCardsListShimmer count={3} />
      <Spinner />
    </div>
  );
};

export default LoadingMoreVideos;
