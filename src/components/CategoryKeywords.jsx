import { useEffect, useState } from "react";

const CategoryKeywordsShimmer = () => {
  return (
    <ul className="flex overflow-x-hidden  px-5 -left-2 gap-3 py-2 sticky top-[10dvh] bg-bg-primary-low-op backdrop-blur-lg z-10">
      {Array.from({ length: 15 }, () => (
        <li className="h-10 w-24 shrink-0 rounded-lg animate-pulse bg-grey-a8"></li>
      ))}
    </ul>
  );
};

const CategoryKeywords = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchKeywords = async () => {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const params = new URLSearchParams({
        part: "snippet",
        key: import.meta.env.VITE_KEY,
        regionCode: "US",
      });
      const res = await fetch(BASE_URL + "videoCategories?" + params);
      const data = await res.json();
      setCategories(
        data.items.map((obj) => ({ id: obj?.id, title: obj?.snippet?.title })),
      );
    };
    fetchKeywords();
  }, []);
  return categories.length === 0 ? (
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
