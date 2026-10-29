import { useContext } from "react";
import RepliesList from "./RepliesList";
import LoadRepliesButton from "./LoadRepliesButton";
import { CommentThreadsListShimmer } from "./CommentThreadsList";
import RepliesContext from "../utils/RepliesContext";

const RepliesContainer = ({ replyCount }) => {
  const { loadedReplies, status, showReplies } = useContext(RepliesContext);

  const visibleReplies = showReplies ? [...loadedReplies] : [];

  return (
    <div>
      <RepliesList replies={visibleReplies} />
      {status === "pending" && <CommentThreadsListShimmer count={3} />}
      <LoadRepliesButton
        replyCount={replyCount}
        visibleReplyCount={visibleReplies.length}
        loadedReplyCount={loadedReplies.length}
      />
    </div>
  );
};

export default RepliesContainer;
