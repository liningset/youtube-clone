import { useContext, useEffect, useRef } from "react";
import YoutubeIcon from "../common/YoutubeIcon";
import WatchPageContext from "../../data/WatchPageContext";

const MessagesContainer = ({ messages }) => {
  const listRef = useRef(null);
  const { commentsDisabled } = useContext(WatchPageContext);

  useEffect(() => {
    if (messages.length === 0) return;

    listRef.current.scrollBy({
      top: listRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="p-4 flex-1 grid place-content-center text-center">
        {commentsDisabled
          ? "Comments are turned off"
          : "No chat messages at the moment"}
      </div>
    );
  }

  return (
    <ul
      ref={listRef}
      className="border-y-grey-d8 flex max-h-100 flex-1 flex-col overflow-y-auto overflow-x-hidden wrap-break-word border-y py-1"
    >
      {messages.map((message) => {
        return (
          <li
            className="text-sm group flex items-start hover:bg-grey-e8 cursor-pointer ps-4 py-px"
            key={message.id}
          >
            <div className="rounded-full shrink-0 overflow-hidden mt-1 me-4 w-8 aspect-square bg-amber-400">
              <img
                src={message.authorDetails.profileImageUrl}
                className="w-full h-full object-cover"
                alt="avatar"
              />
            </div>
            <div className="w-full mt-1">
              <span className="text-gray-600 font-medium me-2">
                {message.authorDetails.displayName}
              </span>
              {message.snippet.displayMessage}
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
