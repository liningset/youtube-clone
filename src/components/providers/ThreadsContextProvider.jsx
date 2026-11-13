import { useContext, useEffect, useMemo } from "react";
import ThreadsContext from "../../data/ThreadsContext";
import usePaginatedComments from "../../hooks/usePaginatedComments";
import WatchPageContext from "../../data/WatchPageContext";

const START = true;

const ThreadsContextProvider = ({ children }) => {
  const { query: videoId, disableComments } = useContext(WatchPageContext);

  //order param is managed internally
  const params = useMemo(
    () => ({
      part: "snippet",
      videoId,
    }),
    [videoId],
  );

  const { commentState, fetchNext, changeOrder } = usePaginatedComments(
    START,
    params,
    "commentThreads",
  );

  useEffect(() => {
    if (commentState.status.includes("commentsDisabled")) disableComments();
  }, [commentState.status, disableComments]);

  const values = useMemo(
    () => ({
      order: commentState.order,
      changeOrder,
      threads: commentState.comments,
      status: commentState.status,
      nextPage: commentState.nextPage,
      fetchNext,
    }),
    [commentState, fetchNext, changeOrder],
  );

  return (
    <ThreadsContext.Provider value={values}>{children}</ThreadsContext.Provider>
  );
};

export default ThreadsContextProvider;
