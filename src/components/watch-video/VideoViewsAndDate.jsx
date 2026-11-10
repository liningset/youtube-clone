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
}) => {
  const hashtagsMatcher = /((?<=\s)#[^\s#]+)/gi;

  return (
    <div className="flex gap-2 text-sm font-medium">
      <span className="whitespace-nowrap">
        {collapsed
          ? formatToViewsSummary(viewCount)
          : Number(viewCount).toLocaleString()}{" "}
        views
      </span>
      <span className="whitespace-nowrap">
        {collapsed ? formatToTimeAgo(publishedAt) : formatToDate(publishedAt)}
      </span>
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
