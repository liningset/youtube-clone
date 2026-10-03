const CategoryKeywords = () => {
  return (
    <ul className="flex items-center gap-2 py-2 sticky top-[10dvh] bg-bg-primary-low-op backdrop-blur-md z-10">
      <li className="py-1 px-2 rounded-xs text-bg-primary bg-fg-primary cursor-pointer">
        All
      </li>
      <li className="py-1 px-2 rounded-xs text-fg-primary font-semibold bg-grey-e8 cursor-pointer">
        Gaming
      </li>
      <li className="py-1 px-2 rounded-xs text-fg-primary font-semibold bg-grey-e8 cursor-pointer">
        Cooking
      </li>
      <li className="py-1 px-2 rounded-xs text-fg-primary font-semibold bg-grey-e8 cursor-pointer">
        Mr beast
      </li>
    </ul>
  );
};
export default CategoryKeywords;
