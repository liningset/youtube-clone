import LoadingImage from "../../public/Loading_icon_cropped.gif";
import { useContext, useEffect, useRef } from "react";
import PaginationContext from "../utils/PaginationContext";
import { VideoCardsListShimmer } from "./VideoCardsList";

const LoadingWheel = () => {
  const { fetchNextPage } = useContext(PaginationContext);
  const containerRef = useRef(null);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNextPage();
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
      <div className="self-center">
        <img className="w-8" src={LoadingImage} alt="Loading..." />
      </div>
    </div>
  );
};
export default LoadingWheel;
