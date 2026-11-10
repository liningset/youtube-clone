import { formatToViewsSummary, formatToTimeAgo } from "../../utils/formatting";

const CardViewsAndDate = ({
  liveStatus,
  liveDetails,
  publishedAt,
  viewCount,
}) => {
  const renderViewsAndDate = () => {
    if (liveDetails) {
      if (liveStatus === "upcoming") return null;
      if (liveStatus === "live") {
        return (
          <span>
            {formatToViewsSummary(liveDetails.concurrentViewers) + " watching"}
          </span>
        );
      }
      return (
        <>
          <span>{formatToViewsSummary(viewCount)}</span>
          <span>
            {" "}
            • Streamed {formatToTimeAgo(liveDetails?.actualEndTime ?? "")}
          </span>
        </>
      );
    }
    return (
      <>
        <span>{formatToViewsSummary(viewCount)}</span>
        <span> • {formatToTimeAgo(publishedAt)}</span>
      </>
    );
  };

  return (
    <div className="text-xs opacity-70 text-grey-31">
      {renderViewsAndDate()}
    </div>
  );
};

export default CardViewsAndDate;
