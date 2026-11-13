import { formatToTimeAgo, formatToViewsSummary } from "../../utils/formatting";
import YoutubeIcon from "../common/YoutubeIcon";

const ViewsAndDate = ({ viewCount, publishedAt, isLive, liveDetails }) => {
  const renderViews = () => {
    return isLive && liveDetails
      ? formatToViewsSummary(liveDetails.concurrentViewers) + " watching"
      : formatToViewsSummary(viewCount);
  };
  const renderDate = () => {
    if (liveDetails) {
      if (isLive) {
        return "";
      } else {
        return "Streamed " + formatToTimeAgo(liveDetails.actualEndTime);
      }
    } else {
      return formatToTimeAgo(publishedAt);
    }
  };

  return (
    <div className="flex items-start gap-2">
      <span className="flex items-center gap-1 whitespace-nowrap">
        <YoutubeIcon icon="play" tailwindStyles="w-3 h-full" /> {renderViews()}
      </span>
      <span className="min-w-0 line-clamp-1">{renderDate()}</span>
    </div>
  );
};

export default ViewsAndDate;
