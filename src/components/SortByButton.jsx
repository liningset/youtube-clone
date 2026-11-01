import { useContext, useState } from "react";
import YoutubeIcon from "./YoutubeIcon";
import Popover from "./Popover";
import ThreadsContext from "../utils/ThreadsContext";

const PopoverContent = ({ closePopover }) => {
  const { order, changeOrder } = useContext(ThreadsContext);

  const onButtonClick = (orderVal) => {
    if (order !== orderVal) changeOrder(orderVal);
    closePopover();
  };

  return (
    <div className="flex flex-col w-max py-2">
      <button
        onClick={() => onButtonClick("relevance")}
        className={`text-start cursor-pointer p-4 ${order === "relevance" ? "bg-grey-d8" : "hover:bg-grey-e8"}`}
      >
        <div className="font-semibold">Top</div>
        <div className="text-sm">Show featured comments</div>
      </button>

      <button
        onClick={() => onButtonClick("time")}
        className={`text-start cursor-pointer p-4 ${order === "time" ? "bg-grey-d8" : "hover:bg-grey-e8"}`}
      >
        <div className="font-semibold">Newest</div>
        <div className="text-sm">
          Show recent comments, including potential spam
        </div>
      </button>
    </div>
  );
};

const SortByButton = () => {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <>
      <div className="relative popover-container">
        <button
          onClick={() => setShowPopover((prev) => !prev)}
          title="Sort comments"
          className="flex items-center gap-2 cursor-pointer font-medium "
        >
          <YoutubeIcon icon="sortBy" /> Sort by
        </button>

        {showPopover && (
          <Popover setShowPopover={setShowPopover}>
            <PopoverContent closePopover={() => setShowPopover(false)} />
          </Popover>
        )}
      </div>
    </>
  );
};

export default SortByButton;
