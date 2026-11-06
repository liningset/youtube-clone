import { useEffect, useRef } from "react";

const useScrollObserver = (onEvent) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onEvent();
        }
      });
    };
    const observer = new IntersectionObserver((entries) => callback(entries), {
      threshold: 0.5,
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, []);

  return observerRef;
};

export default useScrollObserver;
