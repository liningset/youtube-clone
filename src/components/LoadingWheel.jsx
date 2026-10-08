import LoadingImage from "../../public/Loading_icon_cropped.gif";
import { useContext, useEffect, useRef } from "react";
import PaginationContext from "../utils/PaginationContext";

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
      threshold: 0,
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="self-center">
      <img className="w-8" src={LoadingImage} alt="Loading..." />
    </div>
  );
};
export default LoadingWheel;
