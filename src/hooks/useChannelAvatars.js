import { useState, useEffect } from "react";

const useChannelAvatars = (videos) => {
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (videos.length !== 0) return;
    const fetchChannels = async () => {
      try {
        const channelIDs = videos.map((video) => video.snippet.channelId);
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const params = new URLSearchParams({
          key: import.meta.env.VITE_KEY,
          part: "snippet",
          id: channelIDs.join(","),
        });
        const res = await fetch(BASE_URL + "channels?" + params);
        const data = await res.json();
        console.log(data?.items[0]);
        setIsLoading(false);
        setChannels(data?.items);
      } catch {
        setFailed(true);
      }
    };
    fetchChannels();
    return new AbortController().abort();
  }, [videos]);

  return { channels, isLoading, failed };
};
export default useChannelAvatars;
