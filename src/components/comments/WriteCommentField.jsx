import { useState } from "react";
import Popover from "../common/Popover";
import AskSigninPopoverContent from "../common/AskSigninPopoverContent";

const WriteCommentField = () => {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <form className="flex gap-4 text-sm">
      <div className="w-8 aspect-square overflow-hidden rounded-full">
        <img
          src="https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj"
          alt="default user profile"
        />
      </div>
      <div
        className="popover-container relative flex-1 cursor-text"
        data-container-id="write-comments"
        onClick={() => setShowPopover(true)}
      >
        <input
          type="text"
          placeholder="Add a comment..."
          className="border-b border-grey-a8 focus:border-fg-primary outline-0 h-full w-full pointer-events-none"
        />
        {showPopover && (
          <Popover
            closePopover={() => setShowPopover(false)}
            parentId="write-comments"
          >
            <AskSigninPopoverContent
              heading="Want to join the conversation?"
              sub="Sign in to continue"
            />
          </Popover>
        )}
      </div>
    </form>
  );
};

export default WriteCommentField;
