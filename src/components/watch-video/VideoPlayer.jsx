import { useContext } from "react";
import WatchPageContext from "../../data/WatchPageContext";

const VideoPlayer = () => {
  const { query } = useContext(WatchPageContext);
  return (
    <div className="bg-grey-a8 relative aspect-video w-full [grid-area:video] lg:overflow-hidden lg:rounded-xl">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${query}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
