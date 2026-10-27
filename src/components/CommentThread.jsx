import YoutubeIcon from "./YoutubeIcon";
import RepliesList from "./RepliesList";
import { useState } from "react";
import CommentBody from "./CommentBody";
import CommentActions from "./CommentActions";
import CommentHeading from "./CommentHeading";
import LoadRepliesButton from "./LoadRepliesButton";

const CommentThread = ({
  data,
  canReply = false,
  totalReplyCount = 0,
  topLevel = false,
}) => {
  const {
    authorDisplayName,
    authorProfileImageUrl,
    textDisplay,
    likeCount,
    publishedAt,
    updatedAt,
    canRate,
  } = data.snippet;

  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="flex gap-4">
      <div className="relative cursor-pointer">
        <div>
          {!topLevel && (
            <YoutubeIcon
              icon="curvedLine"
              tailwindStyles="fill-none stroke-grey-a8 absolute right-[calc(100%+1rem)] w-5 h-5"
            />
          )}
          <div
            className={`${topLevel ? "w-10" : "w-6 translate-y-2"} bg-amber-600 rounded-full aspect-square overflow-hidden relative`}
          >
            <img src={authorProfileImageUrl} alt="author profile" />
          </div>
        </div>
        {totalReplyCount > 0 && (
          <div className="line w-px bg-grey-a8 h-[calc(100%-5rem)] absolute left-1/2 -translate-x-1/2"></div>
        )}
      </div>
      <div className="w-full">
        <CommentHeading
          authorName={authorDisplayName}
          publishedAt={publishedAt}
          updatedAt={updatedAt}
        />
        <CommentBody text={textDisplay} />
        <CommentActions
          canRate={canRate}
          canReply={canReply}
          likeCount={likeCount}
        />
        {showReplies && data?.id && topLevel && (
          <RepliesList parentCommentId={data?.id} />
        )}
        <LoadRepliesButton
          replyCount={totalReplyCount}
          clickHandler={() => setShowReplies(true)}
        />
      </div>
    </div>
  );
};

export default CommentThread;
