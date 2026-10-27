import YoutubeIcon from "./YoutubeIcon";

const LoadRepliesButton = ({ replyCount, clickHandler }) => {
  return (
    replyCount > 0 && (
      <div className="replies mt-4 relative">
        <YoutubeIcon
          icon="curvedLine"
          tailwindStyles="fill-none stroke-grey-a8 absolute right-[calc(100%+1rem)] w-5 h-5"
        />

        <button
          onClick={clickHandler}
          className="h-10 px-4 flex items-center relative -translate-x-4 text-sm font-medium transition-button rounded-full hover:bg-grey-d8 cursor-pointer active:bg-grey-a8"
        >
          {replyCount === 1 ? replyCount + " Reply" : replyCount + " Replies"}
          <YoutubeIcon icon="showMore" />
        </button>
      </div>
    )
  );
};

export default LoadRepliesButton;
