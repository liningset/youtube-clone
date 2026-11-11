import YoutubeIcon from "../common/YoutubeIcon";

const MessagesContainer = () => {
  return (
    <ul className="border-y-grey-d8 flex max-h-100 flex-1 flex-col overflow-y-auto border-y py-1">
      {Array.from({ length: 15 }, (_, i) => {
        return (
          <li
            className="text-sm group flex items-center hover:bg-grey-e8 cursor-pointer ps-4 py-px"
            key={i}
          >
            <div className="rounded-full me-4 w-8 aspect-square bg-amber-400"></div>
            <div className="w-full">
              <span className="text-gray-600 font-medium me-2">@asmongolf</span>
              Lorem ipsum dolor, sit amet.
            </div>
            <button className="ms-auto invisible group-hover:visible p-1 rounded-full cursor-pointer transition-button border-bg-primary active:bg-grey-d8  active:border-grey-d8">
              <YoutubeIcon icon="threeDots" />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default MessagesContainer;
