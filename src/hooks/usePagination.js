import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const usePagination = () => {
  const [nextPage, setNextPage] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [list, setList] = useState([]);
  const [channelsList, setChannelsList] = useState([]);
  const [channelsParams, setChannelsParams] = useState(null);

  const params = {
    regionCode: "US",
    chart: "mostPopular",
    part: "snippet,statistics,contentDetails",
    maxResults: 16,
  };
  if (nextPage) params.pageToken = nextPage;

  // fetch resource of type video with fixed params (not stateful) and a trigger state to re-fetch when needed
  const { data: videosBatch } = useFetch("videos", params, trigger);
  //fetch resource of type channel with stateful params and no trigger state, because the trigger happens here in usePagination, the reason trigger is not in useFetch is because useFetch doesn't know about the latest videosBatch and our params depends on it
  const { data: channelsBatch } = useFetch("channels", channelsParams);

  /* every time new batch of videos arrives do two things:
     - sync the list of all videos to accomodate for the change
     - assign a new params for channels API call which triggers a fetch of the new set of channels */

  useEffect(() => {
    if (!videosBatch) return;

    const syncListWithNewestPage = () => {
      setList((prev) => [...prev, ...videosBatch.items]);
      setNextPage(videosBatch?.nextPageToken ?? null);
    };
    syncListWithNewestPage();

    //channelIDs variable is why the re-fetch trigger happens here instead of in useFetch
    const fetchNextChannelsBatch = () => {
      const channelIDs = videosBatch.items.map(
        (video) => video.snippet.channelId,
      );
      setChannelsParams({ part: "snippet", id: channelIDs.join(",") });
    };
    fetchNextChannelsBatch();
  }, [videosBatch]);

  /* every time the new batch of channels arrives:
    - sync list of total channels to include the new changes, it's not supposed to
     trigger anything within useFetch because this hook only returns the state */

  useEffect(() => {
    if (!channelsBatch) return;
    const syncChannelsList = () => {
      setChannelsList((prev) => [...prev, ...channelsBatch.items]);
    };
    syncChannelsList();
  }, [channelsBatch]);

  return {
    data: { videos: list, channels: channelsList },
    nextPage,
    fetchNextPage: () => setTrigger((prev) => prev + 1),
  };
};
export default usePagination;
