import { useMemo } from "react";
import SearchPageContextProvider from "./SearchPageContextProvider";
import { RelatedVideoCardsListShimmer } from "../related-videos/RelatedVideoCardsList";

const RelatedVideosContextProvider = ({ children, video }) => {
  const params = useMemo(() => {
    const obj = {
      q: video?.snippet?.title,
      type: "video",
      part: "snippet",
      maxResults: 50,
    };
    if (video?.snippet?.categoryId)
      obj.videoCategoryId = video.snippet.categoryId;
    return obj;
  }, [video]);

  return video ? (
    <SearchPageContextProvider params={params}>
      {children}
    </SearchPageContextProvider>
  ) : (
    <RelatedVideoCardsListShimmer count={9} />
  );
};

export default RelatedVideosContextProvider;
