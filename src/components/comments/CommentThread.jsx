import YoutubeIcon from "../common/YoutubeIcon";
import CommentBody from "./CommentBody";
import CommentActions from "./CommentActions";
import CommentHeading from "./CommentHeading";
import RepliesContainer from "./RepliesContainer";
import RepliesContextProvider from "../providers/RepliesContextProvider";
import ThreadHitbox from "./ThreadHitbox";

export const CommentThreadShimmer = ({ topLevel }) => {
  return (
    <li aria-hidden="true" className="flex gap-4 w-full items-start relative">
      <div>
        {!topLevel && (
          <YoutubeIcon
            icon="curvedLine"
            tailwindStyles="fill-none stroke-grey-a8 absolute right-[calc(100%+1rem)] w-5 h-5"
          />
        )}
        <div
          className={`${topLevel ? "w-10" : "w-6 translate-y-2"} bg-grey-a8 rounded-full aspect-square`}
        ></div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 w-[15%] min-w-20 rounded-sm bg-grey-a8"></div>
        <div className="h-4 w-full rounded-sm bg-grey-a8"></div>
        <div className="h-4 w-full rounded-sm bg-grey-a8"></div>
        <div className="h-4 w-[50%] rounded-sm bg-grey-a8"></div>
      </div>
    </li>
  );
};

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

  return (
    <RepliesContextProvider parentId={data.id}>
      <div className="thread flex gap-4 scroll-mt-[10vh]">
        <ThreadHitbox
          authorImage={authorProfileImageUrl}
          replyCount={totalReplyCount}
          topLevel={topLevel}
        />
        <div className="w-full">
          <CommentHeading
            authorName={authorDisplayName}
            publishedAt={publishedAt}
            updatedAt={updatedAt}
            commentId={data.id}
          />
          <CommentBody text={textDisplay} />
          <CommentActions
            canRate={canRate}
            canReply={canReply}
            likeCount={likeCount}
          />
          {topLevel && totalReplyCount > 0 && (
            <RepliesContainer replyCount={totalReplyCount} />
          )}
        </div>
      </div>
    </RepliesContextProvider>
  );
};

export default CommentThread;
