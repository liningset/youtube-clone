import { useContext, useEffect, useState } from "react";
import YoutubeIcon from "../common/YoutubeIcon";
import RepliesContext from "../../data/RepliesContext";

const LoadRepliesButton = ({
  replyCount,
  visibleReplyCount,
  loadedReplyCount,
}) => {
  const [buttonText, setButtonText] = useState(
    `${replyCount} Repl${replyCount > 1 ? "ies" : "y"}`,
  );

  const { setStart, fetchNext, showReplies, setShowReplies } =
    useContext(RepliesContext);

  useEffect(() => {
    const updateButtonText = () => {
      if (!showReplies)
        setButtonText(`${replyCount} Repl${replyCount > 1 ? "ies" : "y"}`);
      if (loadedReplyCount < replyCount && showReplies)
        setButtonText("Show more replies");
      if (loadedReplyCount === replyCount && showReplies)
        setButtonText("Hide replies");
    };
    updateButtonText();
  }, [showReplies, loadedReplyCount, replyCount]);

  const onLoadRepliesClick = (e) => {
    if (visibleReplyCount === 0) {
      if (loadedReplyCount === 0) setStart(true);
      setShowReplies(true);

      return;
    } else {
      if (visibleReplyCount === replyCount) {
        setShowReplies(false);

        const toBeScrolled = e.target.closest(".thread");
        toBeScrolled.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else fetchNext();
    }
  };
  return (
    replyCount > 0 && (
      <div className="replies mt-4 relative">
        <YoutubeIcon
          icon="curvedLine"
          tailwindStyles="fill-none stroke-grey-a8 absolute right-[calc(100%+1rem)] w-5 h-5"
        />

        <button
          onClick={onLoadRepliesClick}
          className="h-10 px-4 flex items-center relative -translate-x-4 text-sm font-medium transition-button rounded-full hover:bg-grey-d8 cursor-pointer active:bg-grey-a8"
        >
          {buttonText}
          <YoutubeIcon
            icon={visibleReplyCount === replyCount ? "showLess" : "showMore"}
          />
        </button>
      </div>
    )
  );
};

export default LoadRepliesButton;
