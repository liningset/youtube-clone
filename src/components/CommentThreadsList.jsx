import { useContext } from "react";
import CommentThread, { CommentThreadShimmer } from "./CommentThread";
import WatchPageContext from "../utils/WatchPageContext";
import useFetch from "../hooks/useFetch";
import Spinner from "./Spinner";

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
  const videoId = useContext(WatchPageContext);
  const { data, status } = useFetch("commentThreads", {
    part: "snippet",
    videoId,
    order: "relevance",
  });

  if (status === "pending")
    return <CommentThreadsListShimmer count={10} topLevel={true} />;

  return (
    <div className="flex flex-col gap-4">
      {data?.items.map((thread) => (
        <CommentThread
          key={thread?.id}
          data={thread?.snippet?.topLevelComment}
          canReply={thread?.snippet?.canReply}
          totalReplyCount={thread?.snippet?.totalReplyCount}
          topLevel={true}
        />
      ))}
    </div>
  );
};

export default CommentThreadsList;
