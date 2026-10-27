import { formatToViewsSummary } from "../utils/formatting";
import YoutubeIcon from "./YoutubeIcon";

const CommentActions = ({ canRate, canReply, likeCount }) => {
  return (
    <div className="flex items-center gap-2 text-sm mt-2">
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
  );
};

export default CommentActions;
