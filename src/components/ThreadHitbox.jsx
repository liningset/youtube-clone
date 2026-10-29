import { useContext } from "react";
import YoutubeIcon from "./YoutubeIcon";
import RepliesContext from "../utils/RepliesContext";

const ThreadHitbox = ({ authorImage, replyCount, topLevel }) => {
  const { loadedReplies, showReplies, setShowReplies } =
    useContext(RepliesContext);

  const onHitboxClick = (e) => {
    if (e.target.alt != undefined) return;

    if (loadedReplies.length === 0) return;
    setShowReplies((prev) => !prev);

    if (!showReplies) return;
    const toBeScrolled = e.target.closest(".thread");
    toBeScrolled.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div className="relative cursor-pointer" onClick={onHitboxClick}>
      <div>
        {!topLevel && (
          <YoutubeIcon
            icon="curvedLine"
            tailwindStyles="fill-none stroke-grey-a8 absolute right-[calc(100%+1rem)] w-5 h-5"
          />
        )}
        <div
          className={`${topLevel ? "w-10" : "w-6 translate-y-2"} bg-amber-600 rounded-full aspect-square overflow-hidden relative`}
        >
          <img src={authorImage} alt="author profile" />
        </div>
      </div>
      {replyCount > 0 && (
        <div className="line w-px bg-grey-a8 h-[calc(100%-5rem)] absolute left-1/2 -translate-x-1/2"></div>
      )}
    </div>
  );
};

export default ThreadHitbox;
