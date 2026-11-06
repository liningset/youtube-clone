import { formatToTimeAgo, formatToViewsSummary } from "../../utils/formatting";
import YoutubeIcon from "../common/YoutubeIcon";

const ViewsAndDate = ({ viewCount, publishedAt }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1">
        <YoutubeIcon icon="play" tailwindStyles="w-3 h-full" />{" "}
        {formatToViewsSummary(viewCount)}
      </span>
      <span>{formatToTimeAgo(publishedAt)}</span>
    </div>
  );
};

export default ViewsAndDate;
