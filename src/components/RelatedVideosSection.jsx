import LoadingWheel from "./LoadingWheel";
import RelatedVideoCardsList from "./RelatedVideoCardsList";
import { useContext, useState } from "react";
import PaginationContext from "../utils/PaginationContext";
import BlueSpecialButton from "./BlueSpecialButton";
import Spinner from "./Spinner";
import useBreakpoint from "../hooks/useBreakpoint";

const RelatedVideosSection = () => {
  const { pagination, fetchNext } = useContext(PaginationContext);
  const { state: screenIsLG } = useBreakpoint("1024px");
  const [multiplier, setMultiplier] = useState(1);

  const loadedVideos = pagination.data.videos;
  const visibleVideos = screenIsLG
    ? loadedVideos
    : loadedVideos.slice(0, multiplier * 10);

  const onShowMoreClick = () => {
    if (visibleVideos.length === loadedVideos.length) fetchNext();
    setMultiplier((prev) => prev + 1);
  };

  return (
    <aside className="flex flex-col mb-4 px-4 lg:px-0 lg:w-87.5 [grid-area:related]">
      <RelatedVideoCardsList videos={visibleVideos} />

      {pagination.nextPage ? (
        screenIsLG ? (
          <LoadingWheel />
        ) : pagination.status.videos === "pending" ? (
          <Spinner />
        ) : (
          <BlueSpecialButton text="Show more" onClick={onShowMoreClick} />
        )
      ) : (
        !screenIsLG &&
        loadedVideos.length > visibleVideos.length && (
          <BlueSpecialButton text="Show more" onClick={onShowMoreClick} />
        )
      )}
    </aside>
  );
};

export default RelatedVideosSection;
