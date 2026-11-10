import { useEffect, useMemo } from "react";
import WatchPageContext from "../../data/WatchPageContext";
import useFetch from "../../hooks/useFetch";

const WatchPageContextProvider = ({ children, query }) => {
  console.log(query);

  const { data, status } = useFetch("videos", {
    id: query,
    part: "snippet,contentDetails,statistics,liveStreamingDetails",
  });

  const values = useMemo(
    () => ({
      query,
      watchVideo: data?.items[0],
      dataExists: data?.items[0] != null,
      isLive: data?.items[0]?.snippet?.liveBroadcastContent === "live" || false,
      watchVideoStatus: status,
    }),
    [data, query, status],
  );

  useEffect(() => {
    if (!data) return;
    document.title = data?.items[0]?.snippet?.title + " - YouTube-clone";
  }, [data]);

  return (
    <WatchPageContext.Provider value={values}>
      {children}
    </WatchPageContext.Provider>
  );
};

export default WatchPageContextProvider;
