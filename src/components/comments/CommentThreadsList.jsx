import CommentThread, { CommentThreadShimmer } from "./CommentThread";
import { useContext } from "react";
import ThreadsContext from "../../data/ThreadsContext";
import LoadingMoreComments, { WithObserver } from "./LoadingMoreComments";
import renderErrors from "../../utils/renderErrors";

export const CommentThreadsListShimmer = ({ count, topLevel = false }) => {
  return (
    <ul
      className={`w-full flex flex-col gap-4 animate-pulse ${!topLevel && " mt-4"}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <CommentThreadShimmer key={i} topLevel={topLevel} />
      ))}
    </ul>
  );
};

const ObservantLoadingMoreComments = WithObserver(LoadingMoreComments);

const CommentThreadsList = () => {
  const { threads, status, nextPage } = useContext(ThreadsContext);

  if (status === "pending" && threads.length === 0)
    return <CommentThreadsListShimmer count={5} topLevel={true} />;

  if (status.includes("error")) return renderErrors(status);

  return (
    <div className="flex flex-col gap-4">
      {threads.map((thread) => (
        <CommentThread
          key={thread?.id}
          data={thread?.snippet?.topLevelComment}
          canReply={thread?.snippet?.canReply}
          totalReplyCount={thread?.snippet?.totalReplyCount}
          topLevel={true}
        />
      ))}
      {nextPage != null && <ObservantLoadingMoreComments />}
    </div>
  );
};

export default CommentThreadsList;
