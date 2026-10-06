import useCategories from "../hooks/useCategories";

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

const CategoryKeywords = () => {
  const { categories, isLoading } = useCategories();

  return isLoading ? (
    <CategoryKeywordsShimmer />
  ) : (
    <ul className="flex overflow-x-hidden items-center px-5 -left-2 gap-3 py-2 sticky top-[10dvh] bg-bg-primary-low-op backdrop-blur-lg z-10">
      {categories.map((category) => (
        <li
          key={category?.id}
          className="py-2 px-3 whitespace-nowrap rounded-lg text-fg-primary font-semibold bg-grey-e8 text-sm cursor-pointer"
        >
          {category?.title}
        </li>
      ))}
    </ul>
  );
};
export default CategoryKeywords;
