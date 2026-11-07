import { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import PaginationContext from "../../data/PaginationContext";
import YoutubeIcon from "../common/YoutubeIcon";

const CategoryKeywordsShimmer = () => {
  return (
    <ul className="flex overflow-x-hidden  px-5 -left-2 gap-3 py-2 sticky top-[10dvh] bg-bg-primary-low-op backdrop-blur-lg z-10">
      {Array.from({ length: 15 }, (_, i) => (
        <li
          key={i}
          className="h-10 w-24 shrink-0 rounded-lg animate-pulse bg-grey-a8"
        ></li>
      ))}
    </ul>
  );
};

const Button = ({ className, title, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`${className} absolute cursor-pointer top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex justify-center items-center hover:bg-grey-d8 hover:shadow-[0px_0px_0px_3px] shadow-grey-d8 bg-bg-primary`}
    >
      {children}
    </button>
  );
};

const CategoryKeywords = () => {
  const { pagination, changeCategory } = useContext(PaginationContext);

  const { data: categories, status } = useFetch("videoCategories", {
    part: "snippet",
    regionCode: "US",
  });

  const [scrollable, setScrollable] = useState({ left: false, right: true });

  const overflowingRef = useRef(null);

  const onScrollButtonClick = (e) => {
    const isNextButton = e.target.getAttribute("title") === "Next";

    overflowingRef.current.scrollBy({
      left: isNextButton ? 300 : -300,
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    overflowingRef?.current?.scrollTo(0, 0);
  }, []);

  const clickHandler = (e) => {
    if (e.target.dataset.clickable === "true") {
      const targetText = e.target.textContent;
      if (pagination.category.title === targetText) return;

      const categoryDetails = categories?.items?.find(
        (c) => c?.snippet?.title === targetText,
      );
      changeCategory(
        targetText === "All"
          ? { id: 0, title: "All" }
          : { id: categoryDetails?.id, title: categoryDetails?.snippet?.title },
      );
    }
  };

  if (status.includes("error")) return;

  return status === "pending" ? (
    <CategoryKeywordsShimmer />
  ) : (
    <div className="relative">
      {scrollable.left && (
        <Button
          onClick={onScrollButtonClick}
          title="Previous"
          className="top-1/2 -translate-y-1/2 left-2"
        >
          <YoutubeIcon icon="showLess" tailwindStyles="-rotate-90" />
        </Button>
      )}
      <ul
        onScrollEnd={() => {
          const { scrollLeft, scrollLeftMax } = overflowingRef.current;

          setScrollable({
            left: scrollLeft > 0,
            right: scrollLeft < scrollLeftMax,
          });
        }}
        ref={overflowingRef}
        data-clickable="false"
        onClick={(e) => clickHandler(e)}
        className="flex overflow-x-hidden items-center px-5 -left-2 gap-3 py-2 sticky top-[10dvh] bg-bg-primary-low-op backdrop-blur-lg z-10"
      >
        <li
          data-clickable="true"
          className={`py-2 px-3 whitespace-nowrap rounded-lg ${pagination.category.title === "All" ? "text-grey-e8 bg-fg-primary" : "text-fg-primary bg-grey-e8"} font-semibold  text-sm cursor-pointer`}
        >
          All
        </li>
        {categories?.items.map((category) => (
          <li
            data-clickable="true"
            key={category?.id}
            className={`py-2 px-3 whitespace-nowrap rounded-lg ${pagination.category.title === category?.snippet?.title ? "text-grey-e8 bg-fg-primary" : "text-fg-primary bg-grey-e8"} font-semibold  text-sm cursor-pointer`}
          >
            {category?.snippet?.title}
          </li>
        ))}
      </ul>
      {scrollable.right && (
        <Button onClick={onScrollButtonClick} title="Next" className="right-2">
          <YoutubeIcon icon="showLess" tailwindStyles="rotate-90" />
        </Button>
      )}
    </div>
  );
};
export default CategoryKeywords;
