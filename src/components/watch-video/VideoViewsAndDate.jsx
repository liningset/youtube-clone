import {
  formatToDate,
  formatToViewsSummary,
  formatToTimeAgo,
} from "../../utils/formatting";

const VideoViewsAndDate = ({
  collapsed,
  viewCount,
  publishedAt,
  description,
  isLive,
  liveDetails,
}) => {
  const hashtagsMatcher = /((?<=\s)#[^\s#]+)/gi;

  const renderViews = () => {
    if (isLive && liveDetails) {
      return (
        Number(liveDetails.concurrentViewers).toLocaleString() + " watching now"
      );
    } else {
      return collapsed
        ? formatToViewsSummary(viewCount)
        : Number(viewCount).toLocaleString() + " views";
    }
  };
  const renderDate = () => {
    if (liveDetails) {
      if (isLive) {
        return (
          "Started streaming on " + formatToDate(liveDetails.actualStartTime)
        );
      } else {
        return "Stream ended on " + formatToDate(liveDetails.actualEndTime);
      }
    } else {
      return collapsed
        ? formatToTimeAgo(publishedAt)
        : formatToDate(publishedAt);
    }
  };

  return (
    <div
      className={`w-full text-sm font-medium ${collapsed ? "line-clamp-1" : "mb-4"}`}
    >
      <span className="whitespace-nowrap me-2">{renderViews()}</span>
      <span className="whitespace-nowrap me-2">{renderDate()}</span>
      {hashtagsMatcher.test(description) &&
        description.match(hashtagsMatcher).map((found, i) => (
          <a
            className="text-blue-500 cursor-pointer"
            href={"/results?q=" + found.replace("#", "")}
            key={i}
          >
            {found}{" "}
          </a>
        ))}
    </div>
  );
};

export default VideoViewsAndDate;
