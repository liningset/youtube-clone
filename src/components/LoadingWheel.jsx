import { useContext, useEffect, useRef } from "react";
import PaginationContext from "../utils/PaginationContext";
import { VideoCardsListShimmer } from "./VideoCardsList";
import Spinner from "./Spinner";
import { CommentThreadsListShimmer } from "./CommentThreadsList";
import ThreadsContext from "../utils/ThreadsContext";

const LoadingWheel = ({ type = "videos" }) => {
  const { fetchNext } = useContext(
    type === "videos" ? PaginationContext : ThreadsContext,
  );
  const containerRef = useRef(null);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNext();
        }
      });
    };
    const observer = new IntersectionObserver((entries) => callback(entries), {
      threshold: 0.5,
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-8">
      {type === "comments" ? (
        <CommentThreadsListShimmer count={3} />
      ) : (
        <>
          <VideoCardsListShimmer count={3} />
          <Spinner />
        </>
      )}
    </div>
  );
};
export default LoadingWheel;
