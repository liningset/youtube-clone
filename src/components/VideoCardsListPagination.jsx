import { VideoCardsListShimmer } from "./VideoCardsList";
import LoadingImage from "../../public/Loading_icon_cropped.gif";
import { useEffect, useRef } from "react";

const VideoCardsListPagination = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) alert("yep");
      });
    };
    const observer = new IntersectionObserver((entries) => callback(entries), {
      threshold: 0.5,
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-6 mb-4">
      <VideoCardsListShimmer count={6} />
      <div className="self-center">
        <img className="w-8" src={LoadingImage} alt="Loading..." />
      </div>
    </div>
  );
};
export default VideoCardsListPagination;
