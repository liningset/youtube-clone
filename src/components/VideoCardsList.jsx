import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";

const VideoCardsList = () => {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const fetchVideos = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const params = new URLSearchParams({
      key: import.meta.env.VITE_KEY,
      regionCode: "US",
      chart: "mostPopular",
      part: "snippet,statistics,contentDetails",
      maxResults: 15,
    });
    const res = await fetch(BASE_URL + "videos?" + params);
    const data = await res.json();
    console.log(data?.items[0]);
    setVideos(data?.items);
    await fetchChannels(data?.items);
  };
  const fetchChannels = async (videos) => {
    const channelIDs = videos.map((video) => video.snippet.channelId);
    console.log(channelIDs);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const params = new URLSearchParams({
      key: import.meta.env.VITE_KEY,
      part: "snippet",
      id: channelIDs.join(","),
    });
    const res = await fetch(BASE_URL + "channels?" + params);
    const data = await res.json();
    console.log(data?.items[0]);
    setChannels(data?.items);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <ul className="grid px-5 items-start sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => {
        const channel = channels.find(
          (channel) => channel?.id === video?.snippet?.channelId,
        );

        return <VideoCard key={video?.id} data={video} channelData={channel} />;
      })}
    </ul>
  );
};
export default VideoCardsList;
