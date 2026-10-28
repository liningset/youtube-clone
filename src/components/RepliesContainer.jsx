import { useMemo, useState } from "react";
import RepliesList from "./RepliesList";
import LoadRepliesButton from "./LoadRepliesButton";
import usePaginatedComments from "../hooks/usePaginatedComments";
import { CommentThreadsListShimmer } from "./CommentThreadsList";

const RepliesContainer = ({
  toThread,
  replyCount,
  showReplies,
  setShowReplies,
}) => {
  const [start, setStart] = useState(false);

  const params = useMemo(
    () => ({
      part: "snippet",
      parentId: toThread.id,
      maxResults: 10,
    }),
    [toThread.id],
  );

  const { commentState, fetchNext } = usePaginatedComments(start, params);

  const visibleReplies = showReplies ? [...commentState.comments] : [];

  return (
    <div>
      <RepliesList replies={visibleReplies} />
      {commentState.status === "pending" && (
        <CommentThreadsListShimmer count={3} />
      )}
      <LoadRepliesButton
        replyCount={replyCount}
        visibleReplyCount={visibleReplies.length}
        loadedReplyCount={commentState.comments.length}
        setStart={setStart}
        setShowReplies={setShowReplies}
        fetchNext={fetchNext}
        showReplies={showReplies}
      />
    </div>
  );
};

export default RepliesContainer;
