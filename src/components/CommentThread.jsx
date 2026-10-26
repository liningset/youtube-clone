import YoutubeIcon from "./YoutubeIcon";

const CommentThread = () => {
  return (
    <div className="flex gap-4">
      <div className="relative cursor-pointer">
        <div className="w-10 rounded-full aspect-square overflow-hidden">
          <img
            src="https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj"
            alt=""
          />
        </div>
        <div className="line w-px bg-grey-a8 h-[calc(100%-5rem)] absolute left-1/2 -translate-x-1/2"></div>
      </div>
      <div className="w-full">
        <div className="threadHeading flex items-center gap-2 w-full text-sm">
          <span className="font-medium">@pewdiepie</span>
          <span className="opacity-50 hover:opacity-100 cursor-pointer">
            4y ago
          </span>
          <button className="ms-auto p-2 rounded-full cursor-pointer transition-button border-bg-primary active:bg-grey-e8  active:border-grey-e8">
            <YoutubeIcon icon="threeDots" />
          </button>
        </div>
        <div className="threadBody">
          <pre className="whitespace-pre-wrap font-roboto line-clamp-4 text-sm">
            This is like face to face ghosting. As soon as they find out
            something they don't like, they just stop.
          </pre>
          {/* <button className="font-semibold opacity-50 hover:underline cursor-pointer">
            read more
          </button> */}
        </div>
        <div className="actions flex items-center gap-2 text-sm mt-2">
          <button
            title="Like"
            className="w-8 flex justify-center items-center transition-button aspect-square rounded-full hover:bg-grey-d8 cursor-pointer active:bg-grey-a8"
          >
            <YoutubeIcon icon="like" tailwindStyles="w-5" />
          </button>
          <span className="opacity-50">45K</span>
          <button
            title="Dislike"
            className="w-8 flex justify-center items-center transition-button aspect-square rounded-full hover:bg-grey-d8 cursor-pointer active:bg-grey-a8"
          >
            <YoutubeIcon icon="dislike" tailwindStyles="w-5" />
          </button>
          <button className="h-8 px-4 flex items-center text-xs font-medium transition-button rounded-full hover:bg-grey-d8 cursor-pointer active:bg-grey-a8">
            Reply
          </button>
        </div>
        <div className="replies mt-4 relative">
          <YoutubeIcon
            icon="curvedLine"
            tailwindStyles="fill-none stroke-grey-a8 absolute right-[calc(100%+1rem)] w-5 h-5"
          />
          <button className="h-10 px-4 flex items-center relative -translate-x-4 text-sm font-medium transition-button rounded-full hover:bg-grey-d8 cursor-pointer active:bg-grey-a8">
            5 Replies <YoutubeIcon icon="showMore" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentThread;
