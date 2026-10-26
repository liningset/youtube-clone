import { formatToTimeAgo, formatToViewsSummary } from "../utils/formatting";
import YoutubeIcon from "./YoutubeIcon";
import RepliesList from "./RepliesList";
import { useState } from "react";

const CommentThread = ({ data, topLevel = false }) => {
  const {
    authorDisplayName,
    authorProfileImageUrl,
    textDisplay,
    likeCount,
    publishedAt,
    updatedAt,
    canRate,
    parentId,
  } = data.snippet.topLevelComment.snippet;

  const [showReplies, setShowReplies] = useState(false);

  const { canReply, totalReplyCount } = data.snippet;

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
            className={`w-${topLevel ? 10 : 8} bg-amber-600 rounded-full aspect-square overflow-hidden relative`}
          >
            <img src={authorProfileImageUrl} alt="author profile" />
          </div>
        </div>
        {totalReplyCount > 0 && (
          <div className="line w-px bg-grey-a8 h-[calc(100%-5rem)] absolute left-1/2 -translate-x-1/2"></div>
        )}
      </div>
      <div className="w-full">
        <div className="threadHeading flex items-center gap-2 w-full text-xs">
          <span className="font-medium">{authorDisplayName}</span>
          <span className="opacity-50 hover:opacity-100 cursor-pointer">
            {formatToTimeAgo(publishedAt)}{" "}
            {updatedAt === publishedAt ? "" : " (edited)"}
          </span>
          <button className="ms-auto p-2 rounded-full cursor-pointer transition-button border-bg-primary active:bg-grey-e8  active:border-grey-e8">
            <YoutubeIcon icon="threeDots" />
          </button>
        </div>
        <div className="threadBody">
          <pre className="whitespace-pre-wrap font-roboto line-clamp-4 text-sm">
            {textDisplay}
          </pre>
          {/* <button className="font-semibold opacity-50 hover:underline cursor-pointer">
            read more
          </button> */}
        </div>
        <div className="actions flex items-center gap-2 text-sm mt-2">
          {canRate && (
            <>
              <button
                title="Like"
                className="w-8 flex justify-center items-center transition-button aspect-square rounded-full hover:bg-grey-d8 cursor-pointer active:bg-grey-a8"
              >
                <YoutubeIcon icon="like" tailwindStyles="w-5" />
              </button>
              {likeCount > 0 && (
                <span className="opacity-50">
                  {formatToViewsSummary(likeCount)}
                </span>
              )}
              <button
                title="Dislike"
                className="w-8 flex justify-center items-center transition-button aspect-square rounded-full hover:bg-grey-d8 cursor-pointer active:bg-grey-a8"
              >
                <YoutubeIcon icon="dislike" tailwindStyles="w-5" />
              </button>
            </>
          )}
          {canReply && (
            <button className="h-8 px-4 flex items-center text-xs font-medium transition-button rounded-full hover:bg-grey-d8 cursor-pointer active:bg-grey-a8">
              Reply
            </button>
          )}
        </div>
        {showReplies && parentId != undefined && (
          <RepliesList parentCommentId={parentId} />
        )}
        {totalReplyCount > 0 && (
          <div className="replies mt-4 relative">
            <YoutubeIcon
              icon="curvedLine"
              tailwindStyles="fill-none stroke-grey-a8 absolute right-[calc(100%+1rem)] w-5 h-5"
            />

            <button
              onClick={() => setShowReplies(true)}
              className="h-10 px-4 flex items-center relative -translate-x-4 text-sm font-medium transition-button rounded-full hover:bg-grey-d8 cursor-pointer active:bg-grey-a8"
            >
              {totalReplyCount === 1
                ? totalReplyCount + " Reply"
                : totalReplyCount + " Replies"}
              <YoutubeIcon icon="showMore" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentThread;
