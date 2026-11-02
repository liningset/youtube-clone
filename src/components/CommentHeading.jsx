import { useState } from "react";
import { formatToTimeAgo } from "../utils/formatting";
import Popover from "./Popover";
import YoutubeIcon from "./YoutubeIcon";

const CommentHeading = ({ authorName, publishedAt, updatedAt, commentId }) => {
  const [showPopover, setShowPopover] = useState(false);
  const closePopover = () => setShowPopover(false);

  return (
    <div className="flex items-center gap-2 w-full text-xs">
      <span className="font-medium">{authorName}</span>
      <span className="opacity-50 hover:opacity-100 cursor-pointer">
        {formatToTimeAgo(publishedAt)}{" "}
        {updatedAt === publishedAt ? "" : " (edited)"}
      </span>
      <div
        data-container-id={commentId}
        className="popover-container ms-auto relative"
      >
        <button
          onClick={() => setShowPopover((prev) => !prev)}
          className="p-2 rounded-full cursor-pointer transition-button border-bg-primary active:bg-grey-e8 active:border-grey-e8"
        >
          <YoutubeIcon icon="threeDots" />
        </button>
        {showPopover && (
          <Popover closePopover={closePopover} parentId={commentId}>
            <button className="py-2 px-4 cursor-pointer flex gap-2 hover:bg-grey-e8 items-center">
              <YoutubeIcon icon="report" /> Report
            </button>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default CommentHeading;
