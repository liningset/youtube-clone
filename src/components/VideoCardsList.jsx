import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";

const VideoCardsList = () => {
  const [videos, setVideos] = useState([]);
  const fetchVideos = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const params = new URLSearchParams({
      key: import.meta.env.VITE_KEY,
      regionCode: "US",
      chart: "mostPopular",
      part: "snippet",
    });
    const res = await fetch(BASE_URL + "videos?" + params);
    const data = await res.json();
    console.log(data);
    setVideos(data?.items);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video, i) => (
        <VideoCard key={i} data={video?.snippet} />
      ))}
    </ul>
  );
};
export default VideoCardsList;
