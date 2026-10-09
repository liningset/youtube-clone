import useFetch from "../hooks/useFetch";

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

const CategoryKeywords = ({ active, changeCategory }) => {
  const { data: categories, isLoading } = useFetch("videoCategories", {
    part: "snippet",
    regionCode: "US",
  });

  const clickHandler = (e) => {
    if (e.target.dataset.clickable === "true") {
      const targetText = e.target.textContent;
      if (active.title === targetText) return;

      const categoryDetails = categories?.items?.find(
        (c) => c?.snippet?.title === targetText,
      );
      changeCategory(
        targetText === "All"
          ? { id: "0", title: "All" }
          : { id: categoryDetails?.id, title: categoryDetails?.snippet?.title },
      );
    }
  };

  return isLoading ? (
    <CategoryKeywordsShimmer />
  ) : (
    <ul
      data-clickable="false"
      onClick={(e) => clickHandler(e)}
      className="flex overflow-x-hidden items-center px-5 -left-2 gap-3 py-2 sticky top-[10dvh] bg-bg-primary-low-op backdrop-blur-lg z-10"
    >
      <li
        data-clickable="true"
        className={`py-2 px-3 whitespace-nowrap rounded-lg ${active.title === "All" ? "text-grey-e8 bg-fg-primary" : "text-fg-primary bg-grey-e8"} font-semibold  text-sm cursor-pointer`}
      >
        All
      </li>
      {categories?.items.map((category) => (
        <li
          data-clickable="true"
          key={category?.id}
          className={`py-2 px-3 whitespace-nowrap rounded-lg ${active.title === category?.snippet?.title ? "text-grey-e8 bg-fg-primary" : "text-fg-primary bg-grey-e8"} font-semibold  text-sm cursor-pointer`}
        >
          {category?.snippet?.title}
        </li>
      ))}
    </ul>
  );
};
export default CategoryKeywords;
