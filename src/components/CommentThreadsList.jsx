import { useContext, useEffect } from "react";
import CommentThread from "./CommentThread";
import WatchPageContext from "../utils/WatchPageContext";
import useFetch from "../hooks/useFetch";

const CommentThreadsList = () => {
  const videoId = useContext(WatchPageContext);
  const { data } = useFetch("commentThreads", {
    part: "snippet,replies",
    videoId,
    order: "relevance",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
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
