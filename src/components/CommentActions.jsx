import { useState } from "react";
import { formatToViewsSummary } from "../utils/formatting";
import YoutubeIcon from "./YoutubeIcon";
import Popover from "./Popover";
import AskSigninPopoverContent from "./AskSigninPopoverContent";

const ButtonWrapper = ({ children, id }) => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div
      onClick={() => setShowPopover(true)}
      className="popover-container relative"
      data-container-id={id}
    >
      {children}

      {showPopover && (
        <Popover closePopover={() => setShowPopover(false)} parentId={id}>
          <AskSigninPopoverContent
            heading="Want to join the conversation?"
            sub="Sign in to continue"
          />
        </Popover>
      )}
    </div>
  );
};

const CommentActions = ({ canRate, canReply, likeCount }) => {
  return (
    <div
      className="popover-container flex items-center gap-2 text-sm mt-2 relative"
      data-container-id="comment-actions"
    >
      {canRate && (
        <>
          <ButtonWrapper id="like">
            <button
              title="Like"
              className="w-8 flex justify-center items-center transition-button aspect-square rounded-full hover:bg-grey-d8 cursor-pointer active:bg-grey-a8"
            >
              <YoutubeIcon icon="like" tailwindStyles="w-5" />
            </button>
          </ButtonWrapper>
          {likeCount > 0 && (
            <span className="opacity-50">
              {formatToViewsSummary(likeCount)}
            </span>
          )}
          <ButtonWrapper id="dislike">
            <button
              title="Dislike"
              className="w-8 flex justify-center items-center transition-button aspect-square rounded-full hover:bg-grey-d8 cursor-pointer active:bg-grey-a8"
            >
              <YoutubeIcon icon="dislike" tailwindStyles="w-5" />
            </button>
          </ButtonWrapper>
        </>
      )}
      {canReply && (
        <ButtonWrapper id="reply">
          <button className="h-8 px-4 flex items-center text-xs font-medium transition-button rounded-full hover:bg-grey-d8 cursor-pointer active:bg-grey-a8">
            Reply
          </button>
        </ButtonWrapper>
      )}
    </div>
  );
};

export default CommentActions;
