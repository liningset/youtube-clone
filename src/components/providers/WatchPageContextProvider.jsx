import { useEffect, useMemo, useState } from "react";
import WatchPageContext from "../../data/WatchPageContext";
import useFetch from "../../hooks/useFetch";

const WatchPageContextProvider = ({ children, query }) => {
  const [commentsDisabled, setCommentsDisabled] = useState(false);
  const [chatDisabled, setChatDisabled] = useState(false);
  const { data, status } = useFetch("videos", {
    id: query,
    part: "snippet,contentDetails,statistics,liveStreamingDetails,status",
  });
  const liveStatus = data?.items[0]?.snippet?.liveBroadcastContent;

  const values = useMemo(
    () => ({
      query,
      watchVideo: data?.items[0],
      dataExists: data?.items[0] != null,
      isLive: (liveStatus && liveStatus !== "none") || false,
      watchVideoStatus: status,
      madeForKids: data?.items[0]?.status?.madeForKids ?? false,
      chatDisabled,
      commentsDisabled,
      disableChat: () => setChatDisabled(true),
      disableComments: () => setCommentsDisabled(true),
    }),
    [data, query, status, chatDisabled, commentsDisabled, liveStatus],
  );

  useEffect(() => {
    if (!data) return;
    document.title = data?.items[0]?.snippet?.title + " - YouTube-clone";
    const checkIfForKids = () => {
      if (data?.items[0]?.status?.madeForKids) {
        setChatDisabled(true);
        setCommentsDisabled(true);
      }
    };
    checkIfForKids();
  }, [data]);

  return (
    <WatchPageContext.Provider value={values}>
      {children}
    </WatchPageContext.Provider>
  );
};

export default WatchPageContextProvider;
