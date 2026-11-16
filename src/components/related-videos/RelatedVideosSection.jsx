import RelatedVideoCardsList from "./RelatedVideoCardsList";
import { useContext, useState } from "react";
import BlueSpecialButton from "../common/BlueSpecialButton";
import Spinner from "../common/Spinner";
import useBreakpoint from "../../hooks/useBreakpoint";
import LoadingMoreVideos from "./LoadingMoreVideos";
import renderErrors from "../../utils/renderErrors";
import SearchPageContext from "../../data/SearchPageContext";

const RelatedVideosSection = () => {
  const { searchState, fetchNextSearch } = useContext(SearchPageContext);
  const { state: screenIsLG } = useBreakpoint("1024px");
  const [multiplier, setMultiplier] = useState(1);

  const loadedVideos = searchState.videos;
  const visibleVideos = screenIsLG
    ? loadedVideos
    : loadedVideos.slice(0, multiplier * 10);

  const onShowMoreClick = () => {
    if (visibleVideos.length === loadedVideos.length) fetchNextSearch();
    setMultiplier((prev) => prev + 1);
  };

  if (searchState.status.includes("error"))
    return renderErrors(searchState.status);

  return (
    <aside className="flex flex-col gap-2 px-4 [grid-area:related] lg:px-0">
      <RelatedVideoCardsList videos={visibleVideos} />

      {searchState.nextPage ? (
        screenIsLG ? (
          <LoadingMoreVideos />
        ) : searchState.status === "pending" ? (
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
