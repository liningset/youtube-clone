import { useState, useMemo } from "react";
import usePaginatedComments from "../hooks/usePaginatedComments";
import RepliesContext from "./RepliesContext";

const RepliesContextProvider = ({ parentId, children }) => {
  const [start, setStart] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const params = useMemo(
    () => ({ part: "snippet", parentId, maxResults: 10 }),
    [parentId],
  );

  const { commentState, fetchNext } = usePaginatedComments(start, params);

  const values = useMemo(
    () => ({
      showReplies,
      setShowReplies,
      start,
      setStart,
      loadedReplies: commentState.comments,
      status: commentState.status,
      fetchNext,
    }),
    [start, showReplies, commentState, fetchNext],
  );

  return (
    <RepliesContext.Provider value={values}>{children}</RepliesContext.Provider>
  );
};

export default RepliesContextProvider;
