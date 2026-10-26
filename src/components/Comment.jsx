import { formatToTimeAgo } from "../utils/formatting";
import YoutubeIcon from "./YoutubeIcon";

const Comment = ({ data, canReply, totalReplyCount, topLevel = false }) => {
  const {
    authorDisplayName,
    authorProfileImageUrl,
    textDisplay,
    likeCount,
    publishedAt,
    updatedAt,
    canRate,
  } = data.snippet;

  return (
    <div className="flex gap-4">
      <div className="relative cursor-pointer">
        <div>
          {!topLevel && (
            <YoutubeIcon
              icon="curvedLine"
              tailwindStyles="fill-none stroke-grey-a8 absolute right-full w-5 h-5"
            />
          )}
          <div className="w-10 rounded-full aspect-square overflow-hidden relative">
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
              {likeCount > 0 && <span className="opacity-50">{likeCount}</span>}
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
      </div>
    </div>
  );
};

export default Comment;
