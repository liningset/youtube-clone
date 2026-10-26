import CommentThread from "./CommentThread";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

const RepliesList = ({ parentCommentId }) => {
  const { data } = useFetch("comments", {
    part: "snippet",
    parentId: parentCommentId,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="mt-4">
      {data?.items?.map((comment) => (
        <CommentThread
          data={{
            canReply: true,
            totalReplyCount: 0,
            snippet: { topLevelComment: comment },
          }}
        />
      ))}
    </div>
  );
};

export default RepliesList;
