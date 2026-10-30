import { useContext, useMemo } from "react";
import ThreadsContext from "./ThreadsContext";
import usePaginatedComments from "../hooks/usePaginatedComments";
import WatchPageContext from "./WatchPageContext";

const START = true;

const ThreadsContextProvider = ({ children }) => {
  const videoId = useContext(WatchPageContext);

  const params = useMemo(
    () => ({
      part: "snippet",
      videoId,
      order: "relevance",
    }),
    [videoId],
  );

  const { commentState, fetchNext } = usePaginatedComments(
    START,
    params,
    "commentThreads",
  );

  const values = useMemo(
    () => ({
      threads: commentState.comments,
      status: commentState.status,
      nextPage: commentState.nextPage,
      fetchNext,
    }),
    [commentState, fetchNext],
  );

  return (
    <ThreadsContext.Provider value={values}>{children}</ThreadsContext.Provider>
  );
};

export default ThreadsContextProvider;
