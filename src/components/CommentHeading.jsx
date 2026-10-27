import { formatToTimeAgo } from "../utils/formatting";
import YoutubeIcon from "./YoutubeIcon";

const CommentHeading = ({ authorName, publishedAt, updatedAt }) => {
  return (
    <div className="flex items-center gap-2 w-full text-xs">
      <span className="font-medium">{authorName}</span>
      <span className="opacity-50 hover:opacity-100 cursor-pointer">
        {formatToTimeAgo(publishedAt)}{" "}
        {updatedAt === publishedAt ? "" : " (edited)"}
      </span>
      <button className="ms-auto p-2 rounded-full cursor-pointer transition-button border-bg-primary active:bg-grey-e8  active:border-grey-e8">
        <YoutubeIcon icon="threeDots" />
      </button>
    </div>
  );
};

export default CommentHeading;
