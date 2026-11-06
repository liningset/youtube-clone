import { formatToDuration } from "../../utils/formatting";
import extractColor from "../../utils/extract-color";

const Thumbnail = ({ isWatchPage, thumbnails, setColor, duration }) => {
  const onLoad = async (e) => {
    const prominentColor = extractColor(e.target);

    setColor({
      "--prominent": prominentColor,
    });
  };
  return (
    <div
      className={`bg-bg-primary aspect-video relative overflow-hidden ${isWatchPage ? " rounded-lg flex-2 w-full shrink-0" : "rounded-2xl"}`}
    >
      <img
        crossOrigin="anonymous"
        src={thumbnails.high.url}
        className="w-full h-full object-cover"
        alt="video thumbnail"
        onLoad={(e) => onLoad(e)}
      />
      {duration && (
        <span className="absolute right-4 bottom-4 text-xs bg-grey-31 text-bg-primary font-bold p-0.5 rounded-xs opacity-85">
          {formatToDuration(duration)}
        </span>
      )}
    </div>
  );
};

export default Thumbnail;
