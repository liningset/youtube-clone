import { useState } from "react";
import { formatToViewsSummary } from "../../utils/formatting";
import YoutubeIcon from "../common/YoutubeIcon";
import IncludePopover from "./IncludePopover";
import Popover from "../common/Popover";

const VideoActions = ({ likeCount }) => {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <div className="flex gap-2 w-full sm:w-auto">
      <div className="flex">
        <IncludePopover
          id="i-like-this"
          heading="Like this video?"
          sub="Sign in to make your opinion count."
        >
          <button
            title="I like this"
            className="flex h-10 rounded-s-4xl items-center gap-2 px-4 bg-grey-e8 cursor-pointer hover:bg-grey-d8"
          >
            <YoutubeIcon icon="like" />
            <span className="text-sm">{formatToViewsSummary(likeCount)}</span>
          </button>
        </IncludePopover>

        <IncludePopover
          id="i-dislike-this"
          heading="Don't like this video?"
          sub="Sign in to make your opinion count."
        >
          <button
            title="I dislike this"
            className="h-10 rounded-e-4xl px-4 bg-grey-e8 cursor-pointer hover:bg-grey-d8 relative"
          >
            <div className="w-px h-[70%] top-1/2 -translate-y-1/2 absolute left-0 bg-grey-a8"></div>
            <YoutubeIcon icon="dislike" />
          </button>
        </IncludePopover>
      </div>
      <button
        title="Share"
        className="h-10 ms-auto flex justify-center items-center aspect-square rounded-full bg-grey-e8 cursor-pointer hover:bg-grey-d8"
      >
        <YoutubeIcon icon="share" />
      </button>
      <IncludePopover
        id="save-for-later"
        heading="Want to watch this again later?"
        sub="Sign in to add this video to a playlist."
      >
        <button
          title="Save"
          className="h-10 flex justify-center items-center aspect-square rounded-full bg-grey-e8 cursor-pointer hover:bg-grey-d8"
        >
          <YoutubeIcon icon="save" />
        </button>
      </IncludePopover>
      <div
        className="popover-container relative"
        data-container-id="report-video"
      >
        <button
          onClick={() => setShowPopover((prev) => !prev)}
          className="h-10 aspect-square flex justify-center items-center rounded-full bg-grey-e8 cursor-pointer hover:bg-grey-d8"
        >
          <YoutubeIcon icon="threeDots" tailwindStyles="rotate-90" />
        </button>
        {showPopover && (
          <Popover
            closePopover={() => setShowPopover(false)}
            parentId="report-video"
          >
            <button className="py-2 px-4 text-xs cursor-pointer flex gap-2 hover:bg-grey-e8 items-center">
              <YoutubeIcon icon="report" /> Report
            </button>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default VideoActions;
