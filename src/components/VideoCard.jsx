import { useState } from "react";
import YoutubeIcon from "./YoutubeIcon";
import { extractColorsFromImage } from "extract-colors";

const VideoCard = ({ data, channelData }) => {
  const { thumbnails, title, channelTitle, publishedAt } = data.snippet;
  const { duration } = data.contentDetails;
  const { viewCount } = data.statistics;
  const { thumbnails: channelThumbnails } = channelData?.snippet ?? {};
  const [color, setColor] = useState(null);

  const toDuration = (string) => {
    let result = [];
    [/\d+(?=D)/, /\d+(?=H)/, /\d+(?=M)/, /\d+(?=S)/].forEach((regex, i) => {
      const matched = string.match(regex);
      if (!matched) return;
      result.push(
        i > 0 && result.length > 0 ? matched[0].padStart(2, "0") : matched[0],
      );
    });

    return result.length === 1 ? "0:" + result.join(":") : result.join(":");
  };
  const toViews = (number) => {
    const format = (m, l) => (number / m).toFixed(1).concat(l);
    if (number > 1000000000)
      return format(1000000000, "B").replace(/(?<=\d+)\.0(?=[KMB])/, "");
    if (number > 1000000)
      return format(1000000, "M").replace(/(?<=\d+)\.0(?=[KMB])/, "");
    if (number > 1000)
      return format(1000, "K").replace(/(?<=\d+)\.0(?=[KMB])/, "");

    return number.toString();
  };
  const onLoad = async (e) => {
    const palette = await extractColorsFromImage(e.target);
    const { red: r, green: g, blue: b } = palette[0];

    setColor({
      "--color-20": `rgb(${r},${g},${b},0.20)`,
    });
  };
  const toPublishedDate = (datetime) => {
    const diff = new Date() - new Date(datetime);
    const inSecs = Math.floor(diff / 1000);
    const inMins = Math.floor(inSecs / 60);
    const inHours = Math.floor(inMins / 60);
    const inDays = Math.floor(inHours / 24);
    const inWeeks = Math.floor(inDays / 7);
    const inMonths = Math.floor(inWeeks / 4);
    const inYears = Math.floor(inMonths / 12);

    if (inYears) return `${inYears}y ago`;
    if (inMonths) return `${inMonths}mo ago`;
    if (inWeeks) return `${inWeeks}w ago`;
    if (inDays) return `${inDays}d ago`;
    if (inHours) return `${inHours}h ago`;
    if (inMins) return `${inMins}mins ago`;
    if (inSecs) return `${inSecs}s ago`;
  };

  return (
    <li className="group relative">
      <div
        style={color}
        className={`absolute pointer-events-none inset-10 opacity-0 transition-all duration-300 ease rounded-2xl group-hover:opacity-100 group-hover:bg-(--color-20) group-hover:-inset-2${color != null ? "" : " border-2 border-grey-a8"}`}
      ></div>
      <div
        className={`bg-bg-primary aspect-video relative overflow-hidden rounded-2xl`}
      >
        <img
          src={thumbnails.high.url}
          className="w-full h-full object-cover"
          alt="video thumbnail"
          onLoad={(e) => onLoad(e)}
        />
        {duration && (
          <span className="absolute right-4 bottom-4 text-xs bg-grey-31 text-bg-primary p-0.5 rounded-xs opacity-75">
            {toDuration(duration)}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-16 aspect-square rounded-full overflow-hidden bg-border-clr">
          <img src={channelThumbnails?.default?.url} alt="channel profile" />
        </div>
        <div className="w-full">
          <div className="flex w-full justify-between items-center">
            <h3 className="font-bold text-lg">{title}</h3>
            <button className="p-2 rounded-full self-start cursor-pointer transition-button border-bg-primary active:bg-grey-e8  active:border-grey-e8">
              <YoutubeIcon icon="threeDots" />
            </button>
          </div>
          <div className="text-sm text-grey-31">
            <span>{channelTitle}</span> • <span>{toViews(viewCount)}</span> •{" "}
            <span>{toPublishedDate(publishedAt)}</span>
          </div>
        </div>
      </div>
    </li>
  );
};
export default VideoCard;
