import { useContext } from "react";
import useScrollObserver from "../../hooks/useScrollObserver";
import Spinner from "../common/Spinner";
import { CommentThreadsListShimmer } from "./CommentThreadsList";
import ThreadsContext from "../../data/ThreadsContext";

const LoadingMoreComments = () => {
  return (
    <div className="flex flex-col gap-8">
      <CommentThreadsListShimmer count={3} />
      <Spinner />
    </div>
  );
};

export const WithObserver = (LoadingMoreComments) => {
  const Component = () => {
    const { fetchNext } = useContext(ThreadsContext);
    const containerRef = useScrollObserver(fetchNext);
    return (
      <div ref={containerRef}>
        <LoadingMoreComments />
      </div>
    );
  };
  return Component;
};

export default LoadingMoreComments;
