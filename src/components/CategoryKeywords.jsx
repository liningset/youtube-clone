import { useEffect, useState } from "react";

const CategoryKeywords = () => {
  const [categories, setCategories] = useState(["All"]);
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

  useEffect(() => {
    fetchKeywords();
  }, []);
  return (
    <ul className="flex overflow-hidden items-center gap-2 py-2 sticky top-[10dvh] bg-bg-primary-low-op backdrop-blur-md z-10">
      {/* <li className="py-1 px-2 rounded-xs text-bg-primary bg-fg-primary cursor-pointer">
        All
      </li> */}

      {categories.map((category) => (
        <li
          key={category?.id}
          className="py-1 px-2 whitespace-nowrap rounded-xs text-fg-primary font-semibold bg-grey-e8 cursor-pointer"
        >
          {category?.title}
        </li>
      ))}
    </ul>
  );
};
export default CategoryKeywords;
