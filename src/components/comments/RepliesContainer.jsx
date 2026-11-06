import { useContext } from "react";
import RepliesList from "./RepliesList";
import LoadRepliesButton from "./LoadRepliesButton";
import RepliesContext from "../../data/RepliesContext";
import LoadingMoreComments from "./LoadingMoreComments";

const RepliesContainer = ({ replyCount }) => {
  const { loadedReplies, status, showReplies } = useContext(RepliesContext);

  const visibleReplies = showReplies ? [...loadedReplies] : [];

  return (
    <div>
      <RepliesList replies={visibleReplies} />
      {status === "pending" && <LoadingMoreComments />}
      <LoadRepliesButton
        replyCount={replyCount}
        visibleReplyCount={visibleReplies.length}
        loadedReplyCount={loadedReplies.length}
      />
    </div>
  );
};

export default RepliesContainer;
