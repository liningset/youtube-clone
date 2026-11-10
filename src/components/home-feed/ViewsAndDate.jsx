import { formatToTimeAgo, formatToViewsSummary } from "../../utils/formatting";
import YoutubeIcon from "../common/YoutubeIcon";

const ViewsAndDate = ({ viewCount, publishedAt, isLive, liveDetails }) => {
  const renderViews = () => {
    return isLive && liveDetails ? (
      formatToViewsSummary(liveDetails.concurrentViewers) + " watching"
    ) : (
      <>
        <span className="flex items-center gap-1">
          <YoutubeIcon icon="play" tailwindStyles="w-3 h-full" />{" "}
          {formatToViewsSummary(viewCount)}
        </span>
        <span>{formatToTimeAgo(publishedAt)}</span>
      </>
    );
  };

  return <div className="flex items-center gap-2">{renderViews()}</div>;
};

export default ViewsAndDate;
