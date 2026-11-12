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
        : Number(viewCount).toLocaleString() + "views";
    }
  };
  const renderDate = () => {
    if (isLive && liveDetails) {
      return (
        "Started streaming on " + formatToDate(liveDetails.actualStartTime)
      );
    } else {
      return collapsed
        ? formatToTimeAgo(publishedAt)
        : formatToDate(publishedAt);
    }
  };

  return (
    <div className="flex gap-2 text-sm font-medium">
      <span className="whitespace-nowrap">{renderViews()}</span>
      <span className="whitespace-nowrap">{renderDate()}</span>
      <ul
        className={`flex gap-1 min-w-0 items-center overflow-hidden ${collapsed ? "w-90" : "flex-wrap"}`}
      >
        {hashtagsMatcher.test(description) &&
          description.match(hashtagsMatcher).map((found, i) => (
            <a
              className="text-blue-500 cursor-pointer"
              href={"/results?q=" + found.replace("#", "")}
              key={i}
            >
              {found}
            </a>
          ))}
      </ul>
    </div>
  );
};

export default VideoViewsAndDate;
