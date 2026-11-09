import { useContext, useEffect, useState } from "react";
import RepliesList from "./RepliesList";
import LoadRepliesButton from "./LoadRepliesButton";
import RepliesContext from "../../data/RepliesContext";
import LoadingMoreComments from "./LoadingMoreComments";
import Toast from "../common/Toast";

const RepliesContainer = ({ replyCount }) => {
  const { loadedReplies, status, showReplies } = useContext(RepliesContext);
  const [showError, setShowError] = useState(false);

  const visibleReplies = showReplies ? [...loadedReplies] : [];

  useEffect(() => {
    const displayErrorToast = () => {
      if (status.includes("error")) setShowError(true);
    };
    displayErrorToast();
  }, [status]);

  return (
    <div>
      {showError && (
        <Toast type="error" discard={() => setShowError(false)}>
          Could not load replies
        </Toast>
      )}
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
