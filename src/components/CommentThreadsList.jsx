import CommentThread, { CommentThreadShimmer } from "./CommentThread";
import Spinner from "./Spinner";
import LoadingWheel from "./LoadingWheel";
import { useContext } from "react";
import ThreadsContext from "../utils/ThreadsContext";

export const CommentThreadsListShimmer = ({ count, topLevel = false }) => {
  return (
    <ul
      className={`w-full flex flex-col gap-4 animate-pulse${!topLevel && " mt-4"}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <CommentThreadShimmer key={i} topLevel={topLevel} />
      ))}
      <Spinner />
    </ul>
  );
};

const CommentThreadsList = () => {
  const { threads, status, nextPage } = useContext(ThreadsContext);

  if (status === "pending" && threads.length === 0)
    return <CommentThreadsListShimmer count={5} topLevel={true} />;

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
      {nextPage && <LoadingWheel type="comments" />}
    </div>
  );
};

export default CommentThreadsList;
