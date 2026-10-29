import { useContext, useEffect, useRef } from "react";
import PaginationContext from "../utils/PaginationContext";
import { VideoCardsListShimmer } from "./VideoCardsList";
import Spinner from "./Spinner";

const LoadingWheel = () => {
  const { fetchNext } = useContext(PaginationContext);
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
      <VideoCardsListShimmer count={3} />
      <Spinner />
    </div>
  );
};
export default LoadingWheel;
